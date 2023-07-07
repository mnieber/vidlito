import { comparer } from 'mobx';
import { useGetPlaylist } from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

export type ArgsT = {
  playlistSlug: string;
  enabled: boolean;
  playlistsState: PlaylistsState;
};

export function useGetPlaylistObservableQuery(args: ArgsT) {
  const getPlaylist = useObservableQuery(
    useGetPlaylist(
      { playlistSlug: args.playlistSlug },
      { enabled: args.enabled }
    ),
    { fetchAsLoad: true, debugLabel: 'getPlaylist' }
  );

  // Here we have to do a deep compare to avoid infinite loops. If the playlist (that we get from
  // getPlaylist) is equal to the currently highlighted playlist, then keep using the latter.
  const getPlaylistDataSafe = () => {
    const playlist = getPlaylist.data?.playlist;
    return comparer.structural(
      args.playlistsState.playlistsCtr.highlight.item,
      playlist
    )
      ? args.playlistsState.playlistsCtr.highlight.item
      : playlist;
  };
  return { getPlaylistData: getPlaylistDataSafe, getPlaylist };
}
