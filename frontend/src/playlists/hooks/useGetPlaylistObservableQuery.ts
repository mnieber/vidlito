import { useGetPlaylist } from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

export type ArgsT = {
  playlistSlug: string;
  enabled: boolean;
  playlistsState?: PlaylistsState;
};

export function useGetPlaylistObservableQuery(args: ArgsT) {
  const getPlaylist = useObservableQuery(
    useGetPlaylist(
      { playlistSlug: args.playlistSlug },
      { enabled: args.enabled }
    ),
    { fetchAsLoad: true, debugLabel: 'getPlaylist' }
  );

  return {
    getPlaylistData: () => getPlaylist.data?.playlist,
    getPlaylist,
  };
}
