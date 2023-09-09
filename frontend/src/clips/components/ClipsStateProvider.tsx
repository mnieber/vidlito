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
    const { clipsState: state, isGetClipPdLoading, isGetClipPdUpdating } =
      useClipsState({ getPlaylist: () => props.playlist });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get clips() {
          const clips = state.clipsCtr.display.items;
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
          const clip = state.clipsCtr.highlight.item;

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
              resource: state.clipPdCtr.store.clipPd,
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
          clipsState: () => state,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        clips: () => cache.clips,
        clip: () => cache.clip,
        clipsAddition: () => state.clipsCtr.addition,
        clipsDeletion: () => state.clipsCtr.deletion,
        clipsDragAndDrop: () => state.clipsCtr.dragAndDrop,
        clipsEdit: () => state.clipsCtr.edit,
        clipsHighlight: () => state.clipsCtr.highlight,
        clipsHovering: () => state.clipsCtr.hovering,
        clipsMove: () => state.clipsCtr.move,
        clipsSelection: () => state.clipsCtr.selection,
      };

      result.defaultProps = {
        ...result.defaultProps,
        clipPd: () => cache.clipPd,
        clipPdEdit: () => state.clipPdCtr.edit,
        clipSettingsEdit: () => state.clipSettingsCtr.edit,
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
