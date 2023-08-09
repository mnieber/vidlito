import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { usePlaylistsState } from '/src/playlists/hooks/usePlaylistsState';
import { isLoading, isUpdating, updateSources } from '/src/resourceStates';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { playlistsState, isGetPlaylistLoading, isGetPlaylistUpdating } =
      usePlaylistsState({
        getUserProfile: () => props.userProfile,
      });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get playlists() {
          return updateSources(
            { resource: playlistsState.playlistsCtr.display.items },
            ['loading', () => isLoading(props.userProfile), 'userProfile'],
            ['updating', () => isUpdating(props.userProfile), 'userProfile']
          );
        },
        get playlist() {
          return updateSources(
            {
              resource: playlistsState.playlistsCtr.highlight.item,
              resourceName: 'playlist',
            },
            ['loading', () => isLoading(props.userProfile), 'userProfile'],
            ['loading', () => isGetPlaylistLoading(), 'getPlaylist'],
            ['updating', () => isGetPlaylistUpdating(), 'getPlaylist']
          );
        },
      })
    );

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          playlistsState: () => playlistsState,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        playlists: () => cache.playlists,
        playlist: () => cache.playlist,
        playlistsAddition: () => playlistsState.playlistsCtr.addition,
        playlistsDeletion: () => playlistsState.playlistsCtr.deletion,
        playlistsDragAndDrop: () => playlistsState.playlistsCtr.dragAndDrop,
        playlistsEdit: () => playlistsState.playlistsCtr.edit,
        playlistsHighlight: () => playlistsState.playlistsCtr.highlight,
        playlistsHovering: () => playlistsState.playlistsCtr.hovering,
        playlistsSelection: () => playlistsState.playlistsCtr.selection,
      };

      result.defaultProps = {
        ...result.defaultProps,
        playlistPdEdit: () => playlistsState.pdCtr.edit,
      };

      result.defaultProps = {
        ...result.defaultProps,
        playlistSettingsEdit: () => playlistsState.settingsCtr.edit,
        playlistFollowing: () => playlistsState.settingsCtr.following,
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
