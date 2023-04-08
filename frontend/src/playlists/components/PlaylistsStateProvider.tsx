import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { isQueryLoading, isQueryUpdating } from 'src/api/QueryData';
import { useGetPlaylist } from 'src/api/endpoints';
import { useQueryData } from 'src/api/hooks';
import { withSources } from 'src/api/utils/withSources';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { usePlaylistsState } from 'src/playlists/hooks/usePlaylistsState';
import { updatePlaylists } from 'src/playlists/utils';
import { graftResourceStates, isLoading, isUpdating } from 'src/resourceStates';
import { useBuilder } from 'src/utils/hooks/useBuilder';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.urlState,
  ...dps.userProfile,
};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { playlistsState } = usePlaylistsState({});

    const playlistSlug = props.urlState.getPlaylistSlug();
    const getPlaylist = useQueryData(
      useGetPlaylist({
        playlistSlug:
          playlistSlug === 'new-playlist' ? undefined : playlistSlug,
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
        playlistsState.playlistsCtr.data.playlists = graftResourceStates({
          resources: updatePlaylists(
            inputs.playlists ?? [],
            inputs.fullPlaylist
          ),
          prevResources: playlistsState.playlistsCtr.data.playlists,
        });
      },
      logState: () => {
        log('PlaylistsState updated', playlistsState.getSummary());
      },
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get playlists() {
          return withSources(
            { resource: playlistsState.playlistsCtr.data.playlistsDisplay },
            ['loading', () => isLoading(props.userProfile), 'userProfile'],
            ['updating', () => isUpdating(props.userProfile), 'userProfile']
          );
        },
        get playlist() {
          return withSources(
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
        playlistsSelection: () => playlistsState.playlistsCtr.selection,
      };

      return result;
    };

    return (
      <NestedDefaultPropsContext value={getDefaultPropsContext()}>
        {props.children}
      </NestedDefaultPropsContext>
    );
  }, DefaultProps)
);
