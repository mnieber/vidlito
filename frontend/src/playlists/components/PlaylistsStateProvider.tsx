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
    const { playlistsState: state, isGetPlaylistLoading, isGetPlaylistUpdating } =
      usePlaylistsState({
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

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          playlistsState: () => state,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        playlists: () => cache.playlists,
        playlist: () => cache.playlist,
        playlistsAddition: () => state.playlistsCtr.addition,
        playlistsDeletion: () => state.playlistsCtr.deletion,
        playlistsDragAndDrop: () => state.playlistsCtr.dragAndDrop,
        playlistsEdit: () => state.playlistsCtr.edit,
        playlistsHighlight: () => state.playlistsCtr.highlight,
        playlistsHovering: () => state.playlistsCtr.hovering,
        playlistsSelection: () => state.playlistsCtr.selection,
      };

      result.defaultProps = {
        ...result.defaultProps,
        playlistPdEdit: () => state.pdCtr.edit,
      };

      result.defaultProps = {
        ...result.defaultProps,
        playlistSettingsEdit: () => state.settingsCtr.edit,
        playlistFollowing: () => state.settingsCtr.following,
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
