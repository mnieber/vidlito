import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useDeleteClips, useSaveClipOrdering } from 'src/api/mutations';
import { initRS, maybe, setToUpdating } from 'src/api/ResourceState';
import { ClipT } from 'src/api/types/ClipT';
import { defaultProps as dps, withDefaultProps } from 'src/app/defaultProps';
import { flags } from 'src/app/flags';
import { ClipsState } from 'src/clips/ClipsState';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { getIds, lookUp } from 'src/utils/ids';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
};

export const ClipsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const deleteClips = useDeleteClips();
    const saveClipOrdering = useSaveClipOrdering();

    const [state] = React.useState(
      () =>
        new ClipsState({
          deleteClips: (ids: string[]) => {
            R.map(setToUpdating, lookUp(ids, state.clips.data.clipById));
            return deleteClips.mutateAsync({ clipIds: ids });
          },
          saveClipOrdering: (clips: ClipT[]) => {
            return saveClipOrdering.mutateAsync({
              playlistId: props.playlist.id,
              clipIds: getIds(clips),
            });
          },
        })
    );

    useUpdateStateReaction({
      getInputs: () => {
        return {
          clips: props.playlist?.clipSet,
        };
      },
      updateState: (inputs) => {
        R.forEach(initRS, inputs.clips ?? []);
        state.clips.data.clips = inputs.clips ?? [];

        if (flags.logStateProviders) {
          log('ClipsState updated', state.getSummary());
        }
      },
      destroyState: () => state.destroy(),
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          clipsState: () => state,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        clips: () => maybe(props.playlist, [])(state.clips.data.clipsDisplay),
        clip: () => maybe(props.playlist)(state.clips.highlight.item),
        clipsDeletion: () => state.clips.deletion,
        clipsDragAndDrop: () => state.clips.dragAndDrop,
        clipsFiltering: () => state.clips.filtering,
        clipsHighlight: () => state.clips.highlight,
        clipsSelection: () => state.clips.selection,
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
