import { makeObservable } from 'mobx';
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
      makeObservable(
        { clip: undefined, clips: [] },
        { clip: true, clips: true }
      )
    );

    // Set state inputs
    useUpdateStateReaction({
      getInputs: () => {
        return {
          clips: props.playlist?.clipSet ?? [],
        };
      },
      updateState: (inputs) => {
        R.forEach(initRS, inputs.clips);
        clipsState.clips.data.clips = inputs.clips;
      },
      logState: () => {
        log('ClipsState updated', clipsState.getSummary());
      },
      destroyState: () => clipsState.destroy(),
    });

    // Get state outputs
    useUpdateCacheReaction({
      getInputs: () => {
        return {
          clipsDisplay: clipsState.clips.data.clipsDisplay,
          clip: clipsState.clips.highlight.item,
          playlist: props.playlist,
        };
      },
      updateCache: (inputs: ObjT) => {
        cache.clip = reg({
          loading: [
            //
            inputs.playlist,
          ],
        })(inputs.clip);

        cache.clips = reg({
          loading: [
            //
            inputs.playlist,
          ],
          updating: [
            //
            inputs.playlist,
            maybe(moveClipsToPlaylist, 'updating', !!inputs.clipsDisplay),
          ],
        })([...inputs.clipsDisplay]);
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
