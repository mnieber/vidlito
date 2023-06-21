import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { PlaylistT, createPlaylist } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navHandler } from '/src/navHandler/NavHandler';
import { useSearchAndUrlParams } from '/src/utils/hooks';

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
    const params = useSearchAndUrlParams();
    const refSyncFromUrl = React.useRef(true);

    React.useEffect(() => {
      return autorun(() => {
        // If the effect is mounting then sync from the url to the state.
        if (refSyncFromUrl.current) {
          navHandler.hiddenParams.playlistSlug = params.playlistSlug;

          if (
            params.playlistSlug === 'new-playlist' &&
            !props.playlistsAddition.item &&
            props.userProfile
          ) {
            refSyncFromUrl.current = false;
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
              refSyncFromUrl.current = false;
              props.playlistsSelection.selectItem({ itemId: playlist?.id });
              props.playlistsHighlight.highlightItem({ id: playlist?.id });
            }
          }
        } else {
          navHandler.updateHiddenParams();
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
