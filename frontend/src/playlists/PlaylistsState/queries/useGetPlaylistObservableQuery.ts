import { comparer } from 'mobx';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { useGetPlaylist } from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import { useNavHandlerParams } from '/src/frames/hooks/useNavHandlerParams';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

export function useGetPlaylistObservableQuery(playlistsState: PlaylistsState) {
  const params = useNavHandlerParams();
  const getPlaylistSlug = () =>
    playlistsState.playlistsCtr.highlight.item?.slug ?? params.playlistSlug;
  const isGetplaylistEnabled = () => getPlaylistSlug() !== 'new-playlist';

  const getPlaylist = useObservableQuery(
    useGetPlaylist(
      { playlistSlug: getPlaylistSlug() },
      { enabled: isGetplaylistEnabled() }
    ),
    { fetchAsLoad: true, debugLabel: 'getPlaylist' }
  );
  const getPlaylistData = () => getPlaylist.data?.playlist;

  // Here we have to do a deep compare to avoid infinite loops. If the playlist (that we get from
  // getPlaylist) is equal to the currently highlighted playlist, then keep using the latter.
  const getPlaylistDataSafe = () =>
    comparer.structural(
      playlistsState.playlistsCtr.highlight.item,
      getPlaylistData()
    )
      ? playlistsState.playlistsCtr.highlight.item
      : getPlaylistData();

  return {
    getPlaylistData: getPlaylistDataSafe,
    isGetplaylistLoading: () =>
      isGetplaylistEnabled() && isQueryLoading(getPlaylist),
    isGetplaylistUpdating: () =>
      isGetplaylistEnabled() && isQueryUpdating(getPlaylist),
    getPlaylist,
  };
}
