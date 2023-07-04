import { comparer, makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { useGetPlaylist } from '/src/api/endpoints';
import { isLoading, isUpdating } from '/src/api/getState';
import { useObservableQuery } from '/src/api/hooks';
import { updateSources } from '/src/api/utils/updateSources';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useNavHandlerParams } from '/src/frames/hooks/useNavHandlerParams';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
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
    const { playlistsState } = usePlaylistsState({
      userProfile: props.userProfile,
    });
    const params = useNavHandlerParams();
    const playlistSlug =
      playlistsState.playlistsCtr.highlight.item?.slug ?? params.playlistSlug;

    const getPlaylist = useObservableQuery(
      useGetPlaylist({
        playlistSlug:
          playlistSlug === 'new-playlist' ? undefined : playlistSlug,
      }),
      { fetchAsLoad: true, debugLabel: 'getPlaylist' }
    );
    const getFollowedPlaylistsData = () => props.userProfile?.followSet ?? [];
    const getPlaylistData = () => getPlaylist.data?.playlist;

    // Here we have to do a deep compare to avoid infinite loops. If the playlist (that we get from
    // getPlaylist) is equal to the currently highlighted playlist, then keep using the latter.
    const getPlaylistDataSafe = () =>
      comparer.structural(cache.playlist, getPlaylistData())
        ? cache.playlist
        : getPlaylistData();
    const getUpdatedPlaylistsData = () =>
      updatePlaylists(getFollowedPlaylistsData(), getPlaylistDataSafe());

    const graftResourceStatesFromMemo = useGraftResourceStatesFromMemo();
    const cache = useBuilder(() =>
      makeAutoObservable({
        get playlists() {
          const playlists = graftResourceStatesFromMemo({
            resources: getUpdatedPlaylistsData(),
          });
          return updateSources(
            { resource: playlists },
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
            ['loading', () => isQueryLoading(getPlaylist), 'getPlaylist'],
            ['updating', () => isQueryUpdating(getPlaylist), 'getPlaylist']
          );
        },
      })
    );

    useUpdateStateReaction({
      getInputs: () => {
        return {
          playlists: cache.playlists,
          followedPlaylists: getFollowedPlaylistsData(),
        };
      },
      updateState: (inputs) => {
        playlistsState.playlistsCtr.store.followedPlaylists =
          inputs.followedPlaylists;
        playlistsState.playlistsCtr.store.items = inputs.playlists;
      },
      logState: () => {
        log('PlaylistsState updated', playlistsState.getSummary());
      },
    });

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
