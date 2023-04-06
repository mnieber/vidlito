import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useSearchAndUrlParams } from 'src/utils/hooks';

type PropsT = {};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.playlists,
  ...dps.playlistsHighlight,
  ...dps.playlistsSelection,
};

export const SelectPlaylistEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const params = useSearchAndUrlParams();

    React.useEffect(() => {
      return autorun(() => {
        const playlist = R.find(
          (x: PlaylistT) => x.slug === params.playlistSlug
        )(props.playlists);

        if (playlist && !props.playlistsSelection.ids.includes(playlist.id)) {
          props.playlistsSelection.selectItem({ itemId: playlist.id });
          props.playlistsHighlight.highlightItem(playlist.id);
        }
      });
    }, [
      params,
      props.playlists,
      props.playlistsHighlight,
      props.playlistsSelection,
    ]);

    return null;
  }, DefaultProps)
);
