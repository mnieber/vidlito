import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { navHandler } from '/src/navHandler/NavHandler';

type PropsT = {};

const DefaultProps = {
  ...dps.playlist,
};

export const ForwardToClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const params = navHandler.getParams();

    React.useEffect(() => {
      if (
        !params.clipSlug &&
        params.ownerUsername &&
        params.playlistSlug &&
        params.playlistSlug !== 'new-playlist'
      ) {
        navToClip(params.ownerUsername, params.playlistSlug, '-');
      }
    });

    return null;
  }, DefaultProps)
);
