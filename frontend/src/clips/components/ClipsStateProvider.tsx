import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { isLoading, isUpdating, updateSources } from 'mobx-resource-states';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useClipsState } from '/src/clips/hooks/useClipsState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
};

export const ClipsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { clipsState, isGetClipPdLoading, isGetClipPdUpdating } =
      useClipsState({ getPlaylist: () => props.playlist });

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
          const clip = clipsState.clipsCtr.highlight.item;

          return updateSources(
            {
              resource: clip,
              resourceName: 'clip',
            },
            //
            ['loading', () => isLoading(props.playlist), 'playlist']
          );
        },
        get clipPd() {
          return updateSources(
            {
              resource: clipsState.clipPdCtr.store.clipPd,
              resourceName: 'clipPd',
            },
            //
            ['loading', () => isGetClipPdLoading(), 'getClipPd'],
            ['updating', () => isGetClipPdUpdating(), 'getClipPd']
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
        clipPd: () => cache.clipPd,
        clipPdEdit: () => clipsState.clipPdCtr.edit,
        clipSettingsEdit: () => clipsState.clipSettingsCtr.edit,
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
