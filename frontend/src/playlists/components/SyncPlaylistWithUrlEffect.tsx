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
  ...dps.playlistsState,
  ...dps.playlistsAddition,
  ...dps.userProfile,
};

export const SyncPlaylistWithUrlEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const location = useLocation();
    const params = useParams() as ObjT;
    const refUrl = React.useRef<string>("");

    React.useEffect(() => {

      // If there is a new url
      if (refUrl.current !== location.pathname) {
        if (
          params.playlistSlug === 'new-playlist' &&
          !props.playlistsAddition.item &&
          props.userProfile
        ) {
          refUrl.current = location.pathname;
          props.dashboardState.toggleIsPlaylistListExpanded(true);
          props.playlistsAddition.add({
            values: createPlaylist(props.userProfile, {}),
          });
        } else {
          const playlist =
            R.find((x: PlaylistT) => x.slug === params.playlistSlug)(
              props.playlists
            ) ?? R.head(props.playlists);
          if (playlist) {
            refUrl.current = location.pathname;
            if (props.playlist?.id !== playlist.id) {
              props.playlistsSelection.selectItem({ itemId: playlist?.id });
              props.playlistsHighlight.highlightItem({ id: playlist?.id });
            }
          }
        }
      } else {
        if (props.playlist && params.playlistSlug !== props.playlist.slug) {
          navToPlaylist(props.playlist.slug);
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
