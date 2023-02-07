import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { cloneAndSetState, initRS, maybe } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useClipsState } from 'src/clips/hooks/useClipsState';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
};

export const ClipsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { clipsState, moveClipsToPlaylist } = useClipsState({
      playlistId: props.playlist?.id,
    });

    // Set state inputs
    useUpdateStateReaction({
      getInputs: () => ({
        clips: props.playlist?.clipSet ?? [],
      }),
      updateState: (inputs) => {
        clipsState.clips.data.clips = inputs.clips;
        R.forEach(initRS, clipsState.clips.data.clips);
      },
      logState: () => {
        log('ClipsState updated', clipsState.getSummary());
      },
    });

    const [cache] = React.useState(() =>
      makeAutoObservable({
        get clip() {
          return cloneAndSetState(clipsState.clips.highlight.item, {
            loading: [
              //
              props.playlist,
            ],
          });
        },
        get clips() {
          const clipsDisplay = clipsState.clips.data.clipsDisplay;
          return cloneAndSetState(clipsDisplay, {
            loading: [
              //
              props.playlist,
            ],
            updating: [
              //
              props.playlist,
              maybe(moveClipsToPlaylist, 'updating', !!clipsDisplay),
            ],
          });
        },
      })
    );

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          clipsState: () => clipsState,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        clips: () => cache.clips,
        clip: () => cache.clip,
        clipsAddition: () => clipsState.clips.addition,
        clipsDeletion: () => clipsState.clips.deletion,
        clipsDragAndDrop: () => clipsState.clips.dragAndDrop,
        clipsEditing: () => clipsState.clips.editing,
        clipsHighlight: () => clipsState.clips.highlight,
        clipsSelection: () => clipsState.clips.selection,
      };

      return result;
    };

    return (
      <NestedDefaultPropsContext value={getDefaultPropsContext()}>
        {props.children}
      </NestedDefaultPropsContext>
    );
  }, DefaultProps)
);
