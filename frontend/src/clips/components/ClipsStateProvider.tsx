import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import {
  useDeleteClips,
  useSaveClip,
  useSaveClipOrdering,
} from 'src/api/endpoints';
import { initRS, maybe, setToUpdating } from 'src/api/ResourceState';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { flags } from 'src/app/flags';
import { ClipsState } from 'src/clips/ClipsState';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { getIds, lookUp } from 'src/utils/ids';
import { log } from 'src/utils/logging';
import { ObjT } from 'src/utils/types';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
};

export const ClipsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const deleteClips = useDeleteClips();
    const saveClip = useSaveClip();
    const saveClipOrdering = useSaveClipOrdering();

    const [clipsState] = React.useState(
      () =>
        new ClipsState({
          deleteClips: (ids: string[]) => {
            R.map(setToUpdating, lookUp(ids, clipsState.clips.data.clipById));
            return deleteClips.mutateAsync({ clipIds: ids });
          },
          saveClip: (values: ObjT) => {
            return saveClip.mutateAsync(values).then(() => {
              return values.clipForm;
            });
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
        clipsState.clips.data.clips = inputs.clips ?? [];

        if (flags.logStateProviders) {
          log('ClipsState updated', clipsState.getSummary());
        }
      },
      destroyState: () => clipsState.destroy(),
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          clipsState: () => clipsState,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        clips: () =>
          maybe(props.playlist, [])(clipsState.clips.data.clipsDisplay),
        clip: () => maybe(props.playlist)(clipsState.clips.highlight.item),
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
