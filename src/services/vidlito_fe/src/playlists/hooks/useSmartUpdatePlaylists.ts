import { comparer } from 'mobx';
import React from 'react';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { updatePlaylists } from '/src/playlists/utils/updatePlaylists';
import { useBuilder } from '/src/utils/hooks/useBuilder';

// This hook returns a special version of updatePlaylists that caches the
// result. This is necessary to prevent infinite loops when using the result of
// updatePlaylists in the getPlaylists callback that we pass into PlaylistsState.
export const useSmartUpdatePlaylists = () => {
  const followedPlaylistsRef = React.useRef<PlaylistT[] | undefined>();
  const playlistRef = React.useRef<PlaylistT | undefined>();
  const playlistsRef = React.useRef<PlaylistT[] | undefined>();

  const smartUpdatePlaylists = useBuilder(() => {
    return (
      followedPlaylists: PlaylistT[] | undefined,
      playlist: PlaylistT | undefined
    ) => {
      if (
        followedPlaylistsRef.current === followedPlaylists &&
        comparer.structural(playlistRef.current, playlist)
      ) {
        return playlistsRef.current ?? [];
      }

      followedPlaylistsRef.current = followedPlaylists;
      playlistRef.current = playlist;
      playlistsRef.current = playlist
        ? updatePlaylists(followedPlaylists ?? [], playlist)
        : followedPlaylists ?? [];
      return playlistsRef.current;
    };
  });

  return smartUpdatePlaylists;
};
