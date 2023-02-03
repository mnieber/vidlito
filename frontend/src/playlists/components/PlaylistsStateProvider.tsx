import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import {
  useDeletePlaylist,
  useSavePlaylist,
  useSavePlaylistOrdering,
} from 'src/api/endpoints';
import { useGetPlaylist } from 'src/api/queries';
import { initRS, maybe, setToUpdating } from 'src/api/ResourceState';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { flags } from 'src/app/flags';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { PlaylistsState } from 'src/playlists/PlaylistsState';
import { getIds, lookUp } from 'src/utils/ids';
import { log } from 'src/utils/logging';
import { ObjT } from 'src/utils/types';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const deletePlaylist = useDeletePlaylist();
    const savePlaylist = useSavePlaylist();
    const savePlaylistOrdering = useSavePlaylistOrdering();

    const [playlistsState] = React.useState(
      () =>
        new PlaylistsState({
          deletePlaylists: (ids: string[]) => {
            R.map(
              setToUpdating,
              lookUp(ids, playlistsState.playlists.data.playlistById)
            );
            return Promise.all(
              R.map(
                (x: string) => deletePlaylist.mutateAsync({ playlistId: x }),
                ids
              )
            );
          },
          savePlaylist: (values: ObjT) => {
            return savePlaylist.mutateAsync(values).then(() => {
              return values.playlistForm;
            });
          },
          savePlaylistOrdering: (playlists: PlaylistT[]) => {
            return savePlaylistOrdering.mutateAsync({
              playlistIds: getIds(playlists),
            });
          },
        })
    );

    const getPlaylist = useGetPlaylist({
      playlistId: playlistsState.playlists.highlight.id,
    });

    useUpdateStateReaction({
      getInputs: () => {
        return {
          playlists: props.userProfile?.playlistSet,
          playlist: getPlaylist.data?.playlist,
        };
      },
      updateState: (inputs) => {
        // Initialize resource states
        R.forEach(initRS, inputs.playlists ?? []);
        if (inputs.playlist) {
          initRS(inputs.playlist);
        }

        // Initialize data.playlists to the playlists from the user profile
        // with the fully loaded playlist replacing the stub one.
        playlistsState.playlists.data.playlists = _updatePlaylists(
          inputs.playlists,
          inputs.playlist
        );

        if (flags.logStateProviders) {
          log('PlaylistsState updated', playlistsState.getSummary());
        }
      },
      destroyState: () => playlistsState.destroy(),
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          playlistsState: () => playlistsState,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        playlists: () =>
          maybe(
            props.userProfile,
            []
          )(playlistsState.playlists.data.playlistsDisplay),
        playlist: () =>
          maybe(props.userProfile)(playlistsState.playlists.highlight.item),
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

const _updatePlaylists = (playlists: PlaylistT[], playlist?: PlaylistT) => {
  const playlistIdx =
    playlist && playlists
      ? R.findIndex(R.propEq('id', playlist.id), playlists)
      : -1;
  const updatedPlaylists =
    playlistIdx >= 0
      ? R.update(playlistIdx, playlist!, playlists)
      : playlists ?? [];
  return updatedPlaylists;
};
