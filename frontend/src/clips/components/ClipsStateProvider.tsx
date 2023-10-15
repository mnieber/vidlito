import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { isLoading, isUpdating, updateSources } from 'mobx-resource-states';
import * as R from 'ramda';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { ClipsContext } from '/src/clips/hooks/useClipsContext';
import { useClipsState } from '/src/clips/hooks/useClipsState';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { createGetProps } from '/src/utils/createGetProps';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const ContextProps = {
  playlist: playlistsCtx.playlist,
};

export const ClipsStateProvider = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const {
      clipsState: state,
      isGetClipPdLoading,
      isGetClipPdUpdating,
    } = useClipsState({ getPlaylist: () => props.playlist });

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

    const getClipsContext = () => {
      return createGetProps(
        R.mergeAll([
          {
            clipsState: () => state,
          },
          {
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
          },
          {
            clipPd: () => cache.clipPd,
            clipPdEdit: () => state.clipPdCtr.edit,
            clipSettingsEdit: () => state.clipSettingsCtr.edit,
          },
        ])
      );
    };

    return (
      <ClipsContext.Provider value={getClipsContext()}>
        {props.children}
      </ClipsContext.Provider>
    );
  }, ContextProps)
);
