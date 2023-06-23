import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { PlaylistT, createPlaylist } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navHandler } from '/src/navHandler/NavHandler';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { useSearchAndUrlParams } from '/src/utils/hooks';
import { pathname } from '/src/utils/urls';

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
    const params = useSearchAndUrlParams();
    const refUrl = React.useRef<string>("");

    React.useEffect(() => {
      return autorun(() => {
        // If there is a new url
        if (refUrl.current !== pathname()) {
          navHandler.hiddenParams.playlistSlug = params.playlistSlug;

          if (
            params.playlistSlug === 'new-playlist' &&
            !props.playlistsAddition.item &&
            props.userProfile
          ) {
            refUrl.current = pathname();
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
              refUrl.current = pathname();
              if (props.playlist?.id !== playlist.id) {
                props.playlistsSelection.selectItem({ itemId: playlist?.id });
                props.playlistsHighlight.highlightItem({ id: playlist?.id });
              }
            }
          }
        } else {
          if (props.playlist && navHandler.getParams().playlistSlug !== props.playlist.slug) {
            navToPlaylist(props.playlist.slug);
          }
        }
      });
    }, [
      params,
      props.playlists,
      props.playlistsHighlight,
      props.playlistsSelection,
      props.playlistsState,
    ]);

    return null;
  }, DefaultProps)
);
