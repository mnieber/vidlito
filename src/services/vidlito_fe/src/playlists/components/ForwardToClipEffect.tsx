import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavContext } from 'react-nav-handler';
import { withContextProps } from 'react-props-from-context';
import { toClip } from '/src/clips/navFunctions';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { getRouteParams } from '/src/routes/utils/getRouteParams';

type PropsT = {};

const ContextProps = {
  playlist: playlistsCtx.playlist,
};

export const ForwardToClipEffect = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const navContext = useNavContext('ForwardToClipEffect');
    const params = getRouteParams();

    React.useEffect(() => {
      if (
        !params.clipSlug &&
        params.ownerUsername &&
        params.playlistSlug &&
        params.playlistSlug !== 'new-playlist'
      ) {
        navContext.nav(toClip)(params.ownerUsername, params.playlistSlug, '-');
      }
    });

    return null;
  }, ContextProps)
);
