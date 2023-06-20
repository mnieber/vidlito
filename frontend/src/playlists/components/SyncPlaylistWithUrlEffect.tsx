import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { PlaylistT, createPlaylist } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useNavHandler } from '/src/frames/pages';
import { PlaylistsNavEvents } from '/src/playlists/PlaylistsNavEvents';
import { useSearchAndUrlParams } from '/src/utils/hooks';

const useNavEvents = () => useNavHandler<typeof PlaylistsNavEvents>();

type PropsT = {};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.playlists,
  ...dps.playlistsHighlight,
  ...dps.playlistsSelection,
  ...dps.playlistsState,
  ...dps.playlistsAddition,
  ...dps.userProfile,
};

export const SyncPlaylistWithUrlEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const nav = useNavEvents();
    const params = useSearchAndUrlParams();

    React.useEffect(() => {
      return autorun(() => {
        // If there is no highlighted item, then try to sync from the url to the state.
        if (R.isNil(props.playlistsHighlight.id)) {
          if (
            params.playlistSlug === 'new-playlist' &&
            !props.playlistsAddition.item &&
            props.userProfile
          ) {
            props.dashboardState.setIsPlaylistListExpanded(true);
            props.playlistsAddition.add({
              values: createPlaylist(props.userProfile, {}),
            });
          } else {
            const playlist =
              R.find((x: PlaylistT) => x.slug === params.playlistSlug)(
                props.playlists
              ) ?? R.head(props.playlists);
            if (playlist) {
              props.playlistsSelection.selectItem({ itemId: playlist?.id });
              props.playlistsHighlight.highlightItem({ id: playlist?.id });
            }
          }
        }
        // Else try to sync from the state to the url
        else {
          const playlist = props.playlistsHighlight.item;
          if (playlist && playlist.slug !== params.playlistSlug) {
            nav.correctPlaylistSlugUrlParam(playlist.slug);
          }
        }

        // HACK: can we remove this?
        props.playlistsState.settings.setPlaylistOwnerAndSlug(
          params.ownerUsername,
          params.playlistSlug
        );
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
