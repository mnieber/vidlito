import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { isLoading, isUpdating } from '/src/api/getState';
import { updateSources } from '/src/api/utils/updateSources';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { useGetPlaylistObservableQuery } from '/src/playlists/PlaylistsState/queries/useGetPlaylistObservableQuery';
import { useGetPlaylistPDObservableQuery } from '/src/playlists/PlaylistsState/queries/useGetPlaylistPDObservableQuery';
import { usePlaylistsState } from '/src/playlists/hooks/usePlaylistsState';
import { updatePlaylists } from '/src/playlists/utils/updatePlaylists';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { useGraftResourceStatesFromMemo } from '/src/utils/hooks/useGraftResourceStatesFromMemo';
import { log } from '/src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const graftResourceStatesFromMemo = useGraftResourceStatesFromMemo({});
    const getFollowedPlaylistsData = () => props.userProfile?.followSet ?? [];

    const { playlistsState } = usePlaylistsState({
      userProfile: props.userProfile,
    });

    // The getPlaylistData function returns the playlist data from the
    // getPlaylist query
    const { getPlaylistData, isGetplaylistEnabled, getPlaylist } =
      useGetPlaylistObservableQuery(playlistsState);

    const { getPlaylistPDData, isGetPlaylistPDEnabled, getPlaylistPD } =
      useGetPlaylistPDObservableQuery(playlistsState);

    useUpdateStateReaction({
      getInputs: () => {
        return {
          playlists: updatePlaylists(
            getFollowedPlaylistsData(),
            getPlaylistData()
          ),
          followedPlaylists: getFollowedPlaylistsData(),
        };
      },
      updateState: (inputs) => {
        playlistsState.playlistsCtr.store.followedPlaylists =
          inputs.followedPlaylists;
        playlistsState.playlistsCtr.store.items = graftResourceStatesFromMemo({
          resources: inputs.playlists,
        });
      },
      logState: () => {
        log('PlaylistsState updated', playlistsState.getSummary());
      },
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
            [
              'loading',
              () => isGetplaylistEnabled() && isQueryLoading(getPlaylist),
              'getPlaylist',
            ],
            [
              'updating',
              () => isGetplaylistEnabled() && isQueryUpdating(getPlaylist),
              'getPlaylist',
            ]
          );
        },
        get playlistPD() {
          return updateSources(
            {
              resource: getPlaylistPDData(),
              resourceName: 'playlistPD',
            },
            ['loading', () => isLoading(props.userProfile), 'userProfile'],
            [
              'loading',
              () => isGetPlaylistPDEnabled() && isQueryLoading(getPlaylistPD),
              'getPlaylistPD',
            ],
            [
              'updating',
              () => isGetPlaylistPDEnabled() && isQueryUpdating(getPlaylistPD),
              'getPlaylistPD',
            ]
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

      return result;
    };

    return (
      <DefaultPropsProvider extend value={getDefaultPropsContext()}>
        {props.children}
      </DefaultPropsProvider>
    );
  }, DefaultProps)
);
