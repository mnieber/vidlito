import { useGetPlaylistPD } from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import { useNavHandlerParams } from '/src/frames/hooks/useNavHandlerParams';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

export function useGetPlaylistPDObservableQuery(
  playlistsState: PlaylistsState
) {
  const params = useNavHandlerParams();
  const getPlaylistSlug = () =>
    playlistsState.playlistsCtr.highlight.item?.slug ?? params.playlistSlug;
  const isGetPlaylistPDEnabled = () => getPlaylistSlug() !== 'new-playlist';

  const getPlaylistPD = useObservableQuery(
    useGetPlaylistPD(
      { playlistSlug: getPlaylistSlug() },
      { enabled: isGetPlaylistPDEnabled() }
    ),
    { fetchAsLoad: true, debugLabel: 'getPlaylistPD' }
  );
  const getPlaylistPDData = () => getPlaylistPD.data?.playlist;

  return {
    getPlaylistPDData: getPlaylistPDData,
    isGetPlaylistPDEnabled,
    getPlaylistPD,
  };
}
