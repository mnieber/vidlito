import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { isQueryLoading, isQueryUpdating } from '/src/api/QueryData';
import { useGetPlaylist } from '/src/api/endpoints';
import { isLoading, isUpdating } from '/src/api/getState';
import { useQueryData } from '/src/api/hooks';
import { updateSources } from '/src/api/utils/updateSources';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { usePlaylistsState } from '/src/playlists/hooks/usePlaylistsState';
import { updatePlaylists } from '/src/playlists/utils';
import { graftResourceStates } from '/src/resourceStates';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { log } from '/src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { playlistsState } = usePlaylistsState({});

    const getPlaylistSlug = () => playlistsState.settings.playlistSlug;

    const getPlaylist = useQueryData(
      useGetPlaylist({
        playlistSlug:
          getPlaylistSlug() === 'new-playlist' ? undefined : getPlaylistSlug(),
        playlistId: playlistsState.playlistsCtr.highlight.id,
      }),
      { fetchAsLoad: true }
    );

    useUpdateStateReaction({
      getInputs: () => {
        return {
          playlists: props.userProfile?.playlistSet,
          fullPlaylist: getPlaylist.data?.playlist,
        };
      },
      updateState: (inputs) => {
        playlistsState.playlistsCtr.store.items = graftResourceStates({
          resources: updatePlaylists(
            inputs.playlists ?? [],
            inputs.fullPlaylist
          ),
          prevResources: playlistsState.playlistsCtr.store.items,
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
            ['loading', () => isQueryLoading(getPlaylist), 'getPlaylist'],
            ['updating', () => isQueryUpdating(getPlaylist), 'getPlaylist']
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
