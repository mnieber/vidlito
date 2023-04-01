import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useGetPlaylist } from 'src/api/endpoints';
import { useQueryData } from 'src/api/hooks';
import { initRS } from 'src/api/ResourceState';
import { cloneAndSetState } from 'src/api/utils';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { usePlaylistsState } from 'src/playlists/hooks/usePlaylistsState';
import { updatePlaylists } from 'src/playlists/utils';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.urlState,
  ...dps.userProfile,
};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const playlistSlug = props.urlState.playlistSlug;

    const { playlistsState } = usePlaylistsState({});

    const getPlaylist = useQueryData(
      useGetPlaylist({
        playlistSlug:
          playlistSlug === 'new-playlist' ? undefined : playlistSlug,
        playlistId: playlistsState.playlistsCtr.highlight.id,
      }),
      { fetchAsLoad: true, disabledAsReady: true }
    );

    useUpdateStateReaction({
      getInputs: () => ({
        playlists: props.userProfile?.playlistSet,
        fullPlaylist: getPlaylist.data?.playlist,
      }),
      updateState: (inputs) => {
        // Initialize data.playlists to the playlists from the user profile
        // with the fully loaded playlist replacing the stub one.
        playlistsState.playlistsCtr.data.playlists = updatePlaylists(
          inputs.playlists ?? [],
          inputs.fullPlaylist
        );

        // Ensure that every playlist has a ResourceState.
        R.forEach(initRS, playlistsState.playlistsCtr.data.playlists);
      },
      logState: () => {
        log('PlaylistsState updated', playlistsState.getSummary());
      },
    });

    const [cache] = React.useState(() =>
      makeAutoObservable({
        get playlists() {
          return cloneAndSetState(
            playlistsState.playlistsCtr.data.playlistsDisplay,
            [[['loading', 'userProfile'], props.userProfile]]
          );
        },
        get playlist() {
          const fullPlaylist = getPlaylist.data?.playlist;
          return cloneAndSetState(playlistsState.playlistsCtr.highlight.item, [
            [['loading', 'userProfile'], props.userProfile],
            [
              ['loading', 'getPlaylist'],
              !fullPlaylist ? getPlaylist : undefined,
            ],
            [
              ['updating', 'getPlaylist'],
              !!fullPlaylist ? getPlaylist : undefined,
            ],
          ]);
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
