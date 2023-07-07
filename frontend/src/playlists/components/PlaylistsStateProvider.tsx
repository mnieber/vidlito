import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { isLoading, isUpdating } from '/src/api/getState';
import { updateSources } from '/src/api/utils/updateSources';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { usePlaylistsState } from '/src/playlists/hooks/usePlaylistsState';
import { useUpdatePlaylistsState } from '/src/playlists/hooks/useUpdatePlaylistsState';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { playlistsState } = usePlaylistsState({
      userProfile: props.userProfile,
    });
    const {
      isGetPlaylistLoading,
      isGetPlaylistUpdating,
      isGetPlaylistPDLoading,
      isGetPlaylistPDUpdating,
    } = useUpdatePlaylistsState({
      playlistsState,
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
        get playlistPD() {
          return updateSources(
            {
              resource: playlistsState.playlistPDCtr.store.playlistPD,
              resourceName: 'playlistPD',
            },
            ['loading', () => isLoading(props.userProfile), 'userProfile'],
            ['loading', () => isGetPlaylistPDLoading(), 'getPlaylistPD'],
            ['updating', () => isGetPlaylistPDUpdating(), 'getPlaylistPD']
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
        playlistPD: () => cache.playlistPD,
        playlistPDEdit: () => playlistsState.playlistPDCtr.edit,
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
