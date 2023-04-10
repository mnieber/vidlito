import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { createPlaylist } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useSearchAndUrlParams } from 'src/utils/hooks';

type PropsT = {};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.playlistsAddition,
  ...dps.userProfile,
};

export const EditPlaylistEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const params = useSearchAndUrlParams();

    React.useEffect(() => {
      return autorun(() => {
        if (params.playlistSlug === 'new-playlist') {
          if (!props.playlistsAddition.item) {
            props.dashboardState.setIsPlaylistListExpanded(true);
            props.playlistsAddition.add({
              values: createPlaylist(props.userProfile, {}),
            });
          }
        }
      });
    }, [
      params,
      props.dashboardState,
      props.playlistsAddition,
      props.userProfile,
    ]);

    return null;
  }, DefaultProps)
);
