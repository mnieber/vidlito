import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { isLoading, isUpdating, updateSources } from 'mobx-resource-states';
import * as R from 'ramda';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { PlaylistsContext } from '/src/playlists/hooks/usePlaylistsContext';
import { usePlaylistsState } from '/src/playlists/hooks/usePlaylistsState';
import { createGetProps } from '/src/utils/createGetProps';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const ContextProps = {
  userProfile: dashboardCtx.userProfile,
};

export const PlaylistsStateProvider = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const {
      playlistsState: state,
      isGetPlaylistLoading,
      isGetPlaylistUpdating,
    } = usePlaylistsState({
      getUserProfile: () => props.userProfile,
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get playlists() {
          return updateSources(
            { resource: state.playlistsCtr.display.items },
            ['loading', () => isLoading(props.userProfile), 'userProfile'],
            ['updating', () => isUpdating(props.userProfile), 'userProfile']
          );
        },
        get playlist() {
          return updateSources(
            {
              resource: state.playlistsCtr.highlight.item,
              resourceName: 'playlist',
            },
            ['loading', () => isLoading(props.userProfile), 'userProfile'],
            ['loading', () => isGetPlaylistLoading(), 'getPlaylist'],
            ['updating', () => isGetPlaylistUpdating(), 'getPlaylist']
          );
        },
      })
    );

    const getPlaylistsContext = () => {
      return createGetProps(
        R.mergeAll([
          {
            playlistsState: () => state,
          },
          {
            playlists: () => cache.playlists,
            playlist: () => cache.playlist,
            playlistsAddition: () => state.playlistsCtr.addition,
            playlistsDeletion: () => state.playlistsCtr.deletion,
            playlistsDragAndDrop: () => state.playlistsCtr.dragAndDrop,
            playlistsEdit: () => state.playlistsCtr.edit,
            playlistsHighlight: () => state.playlistsCtr.highlight,
            playlistsHovering: () => state.playlistsCtr.hovering,
            playlistsSelection: () => state.playlistsCtr.selection,
          },
          {
            playlistPdEdit: () => state.playlistPdCtr.edit,
          },
          {
            playlistSettingsEdit: () => state.playlistSettingsCtr.edit,
            playlistFollowing: () => state.playlistSettingsCtr.following,
          },
        ])
      );
    };

    return (
      <PlaylistsContext.Provider value={getPlaylistsContext()}>
        {props.children}
      </PlaylistsContext.Provider>
    );
  }, ContextProps)
);
