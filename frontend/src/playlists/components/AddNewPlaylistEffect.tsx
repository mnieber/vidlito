import { observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router-dom';
import { createPlaylist } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useRefUrl } from '/src/routes/hooks/useRefUrl';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.playlist,
  ...dps.playlistsAddition,
  ...dps.userProfile,
};

export const AddNewPlaylistEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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
  }, DefaultProps)
);
