import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PlaylistT, createPlaylist } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.playlists,
  ...dps.playlist,
  ...dps.playlistsHighlight,
  ...dps.playlistsSelection,
  ...dps.playlistsAddition,
  ...dps.userProfile,
};

export const SyncPlaylistWithUrlEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const {
      playlistsAddition,
      userProfile,
      playlistsHighlight,
      playlistsSelection,
      dashboardState,
      playlist,
      playlists,
    } = props;

    const location = useLocation();
    const params = useParams() as ObjT;
    const refUrl = React.useRef<string>('');

    React.useEffect(() => {
      // If there is a new url
      if (refUrl.current !== location.pathname) {
        const mustAddNewPlaylist = () =>
          params.playlistSlug === 'new-playlist' &&
          !playlistsAddition.item &&
          userProfile;

        const addNewPlaylist = () => {
          dashboardState.toggleIsPlaylistListExpanded(true);
          playlistsAddition.add({ values: createPlaylist(userProfile, {}) });
        };

        const getPlaylistForCurrentUrl = () => {
          return R.find((x: PlaylistT) => x.slug === params.playlistSlug)(
            playlists
          );
        };

        const selectPlaylist = (playlist: PlaylistT) => {
          playlistsSelection.selectItem({ itemId: playlist?.id });
          playlistsHighlight.highlightItem({ id: playlist?.id });
        };

        if (mustAddNewPlaylist()) {
          refUrl.current = location.pathname;
          addNewPlaylist();
        } else {
          const playlistForCurrentUrl = getPlaylistForCurrentUrl();
          if (playlistForCurrentUrl) {
            refUrl.current = location.pathname;
            if (playlist?.id !== playlistForCurrentUrl.id) {
              selectPlaylist(playlistForCurrentUrl);
            }
          }
        }
      } else {
        // Check if we must update the current url based on the highlighted playlist.
        if (playlist && params.playlistSlug !== playlist.slug) {
          navToPlaylist(playlist.owner.username, playlist.slug);
        }
      }
    }, [params, playlist, playlists, playlistsHighlight, playlistsSelection]);

    return null;
  }, DefaultProps)
);
