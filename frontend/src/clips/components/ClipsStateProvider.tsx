import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { isLoading, isUpdating } from '/src/api/getState';
import { createClipPD } from '/src/api/types/ClipPDT';
import { updateSources } from '/src/api/utils';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useGetClipPDObservableQuery } from '/src/clips/ClipsState/queries/useGetClipPDObservableQuery';
import { useClipsState } from '/src/clips/hooks/useClipsState';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { useGraftResourceStatesFromMemo } from '/src/utils/hooks/useGraftResourceStatesFromMemo';
import { log } from '/src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
};

export const ClipsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const graftResourceStatesFromMemo = useGraftResourceStatesFromMemo({});
    const getClipsData = () => props.playlist?.clipSet ?? [];

    const { clipsState } = useClipsState({
      playlist: props.playlist,
    });

    const { getClipPDData, isGetClipPDLoading, isGetClipPDUpdating } =
      useGetClipPDObservableQuery(clipsState);

    useUpdateStateReaction({
      getInputs: () => ({
        clips: graftResourceStatesFromMemo({ resources: getClipsData() }),
        clipPD: getClipPDData(),
      }),
      updateState: (inputs) => {
        clipsState.clipsCtr.store.items = inputs.clips ?? [];
        clipsState.clipPDCtr.store.clipPD = inputs.clipPD ?? createClipPD();
      },
      logState: () => {
        log('ClipsState updated', clipsState.getSummary());
      },
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get clips() {
          const clips = clipsState.clipsCtr.display.items;
          return updateSources(
            {
              resource: clips,
              resourceName: 'clips',
            },
            ['loading', () => isLoading(props.playlist), 'playlist'],
            ['updating', () => isUpdating(props.playlist), 'playlist']
          );
        },
        get clip() {
          return updateSources(
            {
              resource: clipsState.clipsCtr.highlight.item,
              resourceName: 'clip',
            },
            //
            ['loading', () => isLoading(props.playlist), 'playlist']
          );
        },
        get clipPD() {
          return updateSources(
            {
              resource: clipsState.clipPDCtr.store.clipPD,
              resourceName: 'clipPD',
            },
            //
            ['loading', () => isGetClipPDLoading(), 'getClipPD'],
            ['updating', () => isGetClipPDUpdating(), 'getClipPD']
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
        clipsHovering: () => clipsState.clipsCtr.hovering,
        clipsMove: () => clipsState.clipsCtr.move,
        clipsSelection: () => clipsState.clipsCtr.selection,
      };

      result.defaultProps = {
        ...result.defaultProps,
        clipPD: () => cache.clipPD,
        clipPDEdit: () => clipsState.clipPDCtr.edit,
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
