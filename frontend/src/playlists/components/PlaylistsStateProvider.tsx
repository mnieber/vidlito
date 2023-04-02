import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useGetPlaylist } from 'src/api/endpoints';
import { useQueryData } from 'src/api/hooks';
import { initAllRS } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { usePlaylistsState } from 'src/playlists/hooks/usePlaylistsState';
import { updatePlaylists } from 'src/playlists/utils';
import { log } from 'src/utils/logging';
import { ObjT } from 'src/utils/types';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.urlState,
  ...dps.userProfile,
};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { playlistsState } = usePlaylistsState({});

    const playlistSlug = props.urlState.playlistSlug;
    const getPlaylist = useQueryData(
      useGetPlaylist({
        playlistSlug:
          playlistSlug === 'new-playlist' ? undefined : playlistSlug,
        playlistId: playlistsState.playlistsCtr.highlight.id,
      }),
      { fetchAsLoad: true }
    );

    useUpdateStateReaction({
      getInputs: () => ({
        playlists: props.userProfile?.playlistSet,
        fullPlaylist: getPlaylist.data?.playlist,
      }),
      updateState: (inputs) => {
        const playlists = updatePlaylists(
          inputs.playlists ?? [],
          inputs.fullPlaylist
        );

        playlistsState.playlistsCtr.data.playlists = initAllRS(
          playlists,
          playlistsState.playlistsCtr.data.playlists
        );
      },
      logState: () => {
        log('PlaylistsState updated', playlistsState.getSummary());
      },
    });

    const [cache] = React.useState(() =>
      makeAutoObservable({
        get playlists() {
          return withSources({
            resource: playlistsState.playlistsCtr.data.playlistsDisplay,
            name: 'playlists',
            isLoaded: !!props.userProfile,
            updaters: [[props.userProfile, 'userProfile']],
          });
        },
        get playlist() {
          const fullPlaylist = getPlaylist.data?.playlist;
          return withSources({
            resource: playlistsState.playlistsCtr.highlight.item,
            name: 'playlist',
            isLoaded: !!fullPlaylist,
            updaters: [
              [props.userProfile, 'userProfile'],
              [getPlaylist, 'getPlaylist'],
            ],
          });
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
        playlistsEditing: () => playlistsState.playlistsCtr.editing,
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

const withSources = (props: ObjT) => {};
