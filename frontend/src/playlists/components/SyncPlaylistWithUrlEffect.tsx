import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { isLoading } from '/src/api/getState';
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
    const location = useLocation();
    const params = useParams() as ObjT;
    const refUrl = React.useRef<string>('');

    React.useEffect(() => {
      // If there is a new url
      if (refUrl.current !== location.pathname) {
        const mustAddNewPlaylist =
          params.playlistSlug === 'new-playlist' &&
          !props.playlistsAddition.item &&
          props.userProfile;

        const addNewPlaylist = () => {
          props.dashboardState.toggleIsPlaylistListExpanded(true);
          props.playlistsAddition.add({
            values: createPlaylist(props.userProfile, {}),
          });
        };

        const getPlaylistForCurrentUrl = () => {
          return (
            R.find((x: PlaylistT) => x.slug === params.playlistSlug)(
              props.playlists
            ) ??
            (isLoading(props.playlist) ? undefined : R.head(props.playlists))
          );
        };

        const selectPlaylist = (playlist: PlaylistT) => {
          props.playlistsSelection.selectItem({ itemId: playlist?.id });
          props.playlistsHighlight.highlightItem({ id: playlist?.id });
        };

        if (mustAddNewPlaylist) {
          refUrl.current = location.pathname;
          addNewPlaylist();
        } else {
          const playlistForCurrentUrl = getPlaylistForCurrentUrl();
          if (playlistForCurrentUrl) {
            refUrl.current = location.pathname;
            if (props.playlist?.id !== playlistForCurrentUrl.id) {
              selectPlaylist(playlistForCurrentUrl);
            }
          }
        }
      } else {
        // Check if we must update the current url based on the highlighted playlist.
        if (props.playlist && params.playlistSlug !== props.playlist.slug) {
          navToPlaylist(props.playlist.owner.username, props.playlist.slug);
        }
      }
    }, [
      params,
      props.playlist,
      props.playlists,
      props.playlistsHighlight,
      props.playlistsSelection,
    ]);

    return null;
  }, DefaultProps)
);
