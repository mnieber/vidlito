import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { initRS } from 'src/api/ResourceState';
import { cloneAndSetState } from 'src/api/utils';
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
      playlist: props.playlist,
    });

    useUpdateStateReaction({
      getInputs: () => ({
        clips: props.playlist?.clipSet,
      }),
      updateState: (inputs) => {
        clipsState.clipsCtr.data.clips = inputs.clips ?? [];
        R.forEach(initRS, clipsState.clipsCtr.data.clips);
      },
      logState: () => {
        log('ClipsState updated', clipsState.getSummary());
      },
    });

    const [cache] = React.useState(() =>
      makeAutoObservable({
        get clips() {
          const clipsDisplay = clipsState.clipsCtr.data.clipsDisplay;
          return cloneAndSetState({
            resource: clipsDisplay,
            sources: [
              [['loading', 'playlist'], props.playlist],
              [['updating', 'playlist'], props.playlist],
              [
                ['updating', 'moveClipsToPlaylist'],
                !!clipsDisplay ? moveClipsToPlaylist : undefined,
              ],
            ],
          });
        },
        get clip() {
          return cloneAndSetState({
            resource: clipsState.clipsCtr.highlight.item,
            sources: [[['loading', 'playlist'], props.playlist]],
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
        clipsAddition: () => clipsState.clipsCtr.addition,
        clipsDeletion: () => clipsState.clipsCtr.deletion,
        clipsDragAndDrop: () => clipsState.clipsCtr.dragAndDrop,
        clipsEditing: () => clipsState.clipsCtr.editing,
        clipsHighlight: () => clipsState.clipsCtr.highlight,
        clipsSelection: () => clipsState.clipsCtr.selection,
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
