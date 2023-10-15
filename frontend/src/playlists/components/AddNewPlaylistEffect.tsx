import { observer } from 'mobx-react-lite';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { useParams } from 'react-router-dom';
import { createPlaylist } from '/src/api/types/PlaylistT';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { useRefUrl } from '/src/routes/hooks/useRefUrl';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const ContextProps = {
  dashboardState: dashboardCtx.dashboardState,
  playlist: playlistsCtx.playlist,
  playlistsAddition: playlistsCtx.playlistsAddition,
  userProfile: dashboardCtx.userProfile,
};

export const AddNewPlaylistEffect = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const { playlistsAddition, userProfile, dashboardState, playlist } = props;

    const params = useParams() as ObjT;
    const { playlistSlug } = params;
    const { updateRefUrl, hasUrlChanged } = useRefUrl();

    React.useEffect(() => {
      // If there is a new url
      if (hasUrlChanged) {
        const mustAddNewPlaylist = () =>
          playlistSlug === 'new-playlist' &&
          !playlistsAddition.item &&
          userProfile;

        if (mustAddNewPlaylist()) {
          updateRefUrl();
          dashboardState.panelState.toggleIsPlaylistListExpanded(true);
          playlistsAddition.add({ values: createPlaylist(userProfile, {}) });
        }
      }
    }, [playlistSlug, playlist]);

    return null;
  }, ContextProps)
);
