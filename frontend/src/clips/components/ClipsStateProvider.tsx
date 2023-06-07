import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { isLoading, isUpdating } from '/src/api/getState';
import { updateSources } from '/src/api/utils';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useClipsState } from '/src/clips/hooks/useClipsState';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { graftResourceStates } from '/src/resourceStates';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { log } from '/src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
};

export const ClipsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { clipsState } = useClipsState({
      playlist: props.playlist,
    });

    useUpdateStateReaction({
      getInputs: () => ({
        clips: props.playlist?.clipSet,
      }),
      updateState: (inputs) => {
        clipsState.clipsCtr.store.items = graftResourceStates({
          resources: inputs.clips ?? [],
          prevResources: clipsState.clipsCtr.store.items,
        });
      },
      logState: () => {
        log('ClipsState updated', clipsState.getSummary());
      },
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get clips() {
          return updateSources(
            { resource: clipsState.clipsCtr.display.items },
            ['loading', () => isLoading(props.playlist), 'playlist'],
            ['updating', () => isUpdating(props.playlist), 'playlist']
          );
        },
        get clip() {
          return updateSources(
            { resource: clipsState.clipsCtr.highlight.item },
            //
            ['loading', () => isLoading(props.playlist), 'playlist']
          );
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
        clipsEdit: () => clipsState.clipsCtr.edit,
        clipsHighlight: () => clipsState.clipsCtr.highlight,
        clipsMove: () => clipsState.clipsCtr.move,
        clipsSelection: () => clipsState.clipsCtr.selection,
      };

      return result;
    };

    return (
      <DefaultPropsProvider extend value={getDefaultPropsContext()}>
        {props.children}
      </DefaultPropsProvider>
    );
  }, DefaultProps)
);
