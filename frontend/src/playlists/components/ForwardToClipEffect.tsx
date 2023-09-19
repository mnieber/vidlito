import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavContext } from 'react-nav-handler';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/navFunctions';
import { getRouteParams } from '/src/routes/utils/getRouteParams';

type PropsT = {};

const DefaultProps = {
  ...dps.playlist,
};

export const ForwardToClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const navContext = useNavContext('ForwardToClipEffect');
    const params = getRouteParams();

    React.useEffect(() => {
      if (
        !params.clipSlug &&
        params.ownerUsername &&
        params.playlistSlug &&
        params.playlistSlug !== 'new-playlist'
      ) {
        navToClip(navContext)(
          params.ownerUsername,
          params.playlistSlug,
          '-'
        ).go();
      }
    });

    return null;
  }, DefaultProps)
);
