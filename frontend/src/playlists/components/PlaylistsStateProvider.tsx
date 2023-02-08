import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useGetPlaylist } from 'src/api/endpoints';
import { useQueryData } from 'src/api/hooks';
import { cloneAndSetState, initRS, maybe } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { usePlaylistsState } from 'src/playlists/hooks/usePlaylistsState';
import { updatePlaylists } from 'src/playlists/utils';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { playlistsState } = usePlaylistsState({});

    const getPlaylist = useQueryData(useGetPlaylist({
      playlistId: playlistsState.playlists.highlight.id,
    }));

    useUpdateStateReaction({
      getInputs: () => ({
        playlists: props.userProfile?.playlistSet,
        fullPlaylist: getPlaylist.data?.playlist,
      }),
      updateState: (inputs) => {
        // Initialize data.playlists to the playlists from the user profile
        // with the fully loaded playlist replacing the stub one.
        playlistsState.playlists.data.playlists = updatePlaylists(
          inputs.playlists ?? [],
          inputs.fullPlaylist
        );

        // Ensure that every playlist has a ResourceState.
        R.forEach(initRS, playlistsState.playlists.data.playlists);
      },
      logState: () => {
        log('PlaylistsState updated', playlistsState.getSummary());
      },
    });

    const [cache] = React.useState(() =>
      makeAutoObservable({
        get playlists() {
          return cloneAndSetState(playlistsState.playlists.data.playlists, {
            loading: [
              //
              props.userProfile,
            ],
          });
        },
        get playlist() {
          const fullPlaylist = getPlaylist.data?.playlist;
          return cloneAndSetState(playlistsState.playlists.highlight.item, {
            loading: [
              props.userProfile,
              maybe(getPlaylist, 'loading', !fullPlaylist),
            ],
            updating: [
              //
              maybe(getPlaylist, 'updating', !!fullPlaylist),
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
        playlistsAddition: () => playlistsState.playlists.addition,
        playlistsDeletion: () => playlistsState.playlists.deletion,
        playlistsDragAndDrop: () => playlistsState.playlists.dragAndDrop,
        playlistsEditing: () => playlistsState.playlists.editing,
        playlistsHighlight: () => playlistsState.playlists.highlight,
        playlistsSelection: () => playlistsState.playlists.selection,
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
