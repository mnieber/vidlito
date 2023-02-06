import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { initRS, maybe, reg } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useClipsState } from 'src/clips/hooks/useClipsState';
import { useUpdateCacheReaction } from 'src/frames/hooks/useUpdateCacheReaction';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { log } from 'src/utils/logging';
import { ObjT } from 'src/utils/types';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
};

export const ClipsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { clipsState, moveClipsToPlaylist } = useClipsState({
      playlistId: props.playlist?.id,
    });

    const [cache] = React.useState(() =>
      makeAutoObservable(
        { clip: undefined, clips: initRS([]) },
        {},
        { deep: false }
      )
    );

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
      destroyState: () => clipsState.destroy(),
    });

    // Get state outputs
    useUpdateCacheReaction({
      getInputs: () => ({
        clipsDisplay: clipsState.clips.data.clipsDisplay,
        clip: clipsState.clips.highlight.item,
        playlist: props.playlist,
      }),
      updateCache: (inputs: ObjT) => {
        cache.clip = reg(inputs.clip, {
          loading: [
            //
            inputs.playlist,
          ],
        });

        cache.clips = reg(inputs.clipsDisplay, {
          loading: [
            //
            inputs.playlist,
          ],
          updating: [
            //
            inputs.playlist,
            maybe(moveClipsToPlaylist, 'updating', !!inputs.clipsDisplay),
          ],
        });
      },
    });

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
