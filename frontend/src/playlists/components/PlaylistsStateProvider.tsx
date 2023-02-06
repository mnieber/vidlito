import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useGetPlaylist } from 'src/api/endpoints';
import { useQueryData } from 'src/api/hooks';
import { initRS, maybe, reg } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateCacheReaction } from 'src/frames/hooks/useUpdateCacheReaction';
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
    const { playlistsState } = usePlaylistsState();

    const [cache] = React.useState(() =>
      makeAutoObservable({ playlist: null, playlists: [] }, {}, { deep: false })
    );

    const getPlaylist = useQueryData(
      useGetPlaylist({
        playlistId: playlistsState.playlists.highlight.id,
      })
    );

    useUpdateStateReaction({
      getInputs: () => {
        return {
          playlists: props.userProfile?.playlistSet ?? [],
          fullPlaylist: getPlaylist.data?.playlist,
        };
      },
      updateState: (inputs) => {
        // Initialize data.playlists to the playlists from the user profile
        // with the fully loaded playlist replacing the stub one.
        R.forEach(initRS, inputs.playlists);
        playlistsState.playlists.data.playlists = updatePlaylists(
          inputs.playlists,
          inputs.fullPlaylist
        );
      },
      logState: () => {
        log('PlaylistsState updated', playlistsState.getSummary());
      },
      destroyState: () => playlistsState.destroy(),
    });

    useUpdateCacheReaction({
      getInputs: () => {
        return {
          playlists: playlistsState.playlists.data.playlists,
          playlist: playlistsState.playlists.highlight.item,
          fullPlaylist: getPlaylist.data?.playlist,
        };
      },
      updateCache: (inputs) => {
        cache.playlists = reg(inputs.playlists, {
          loading: [
            //
            props.userProfile,
          ],
        });

        cache.playlist = reg(inputs.playlist, {
          loading: [
            props.userProfile,
            maybe(getPlaylist, 'loading', !inputs.fullPlaylist),
          ],
          updating: [
            //
            maybe(getPlaylist, 'updating', !!inputs.fullPlaylist),
          ],
        });
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
