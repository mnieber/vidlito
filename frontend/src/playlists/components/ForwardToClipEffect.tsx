import { observer } from 'mobx-react-lite';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { useParams } from 'wouter';
import { dashboardNav } from '/src/dashboard/routes';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { navTo } from '/src/routes/navHandler';

type PropsT = {};

const ContextProps = {
  playlist: playlistsCtx.playlist,
};

export const ForwardToClipEffect = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const params = useParams();

    React.useEffect(() => {
      if (
        !params.clipSlug &&
        params.ownerUsername &&
        params.playlistSlug &&
        params.playlistSlug !== 'new-playlist'
      ) {
        navTo(
          dashboardNav.clip({
            ownerUsername: params.ownerUsername,
            playlistSlug: params.playlistSlug,
            clipSlug: '-',
          })
        );
      }
    });

    return null;
  }, ContextProps)
);
