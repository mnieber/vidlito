import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { useParams } from 'react-router-dom';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const DefaultProps = {
  ...dps.playlists,
  ...dps.playlistsHighlight,
  ...dps.playlistsSelection,
};

export const SelectPlaylistEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const params = useParams() as ObjT;

    React.useEffect(() => {
      // If there is a new url
      if (!props.playlistsHighlight.itemId) {
        const selectPlaylist = (playlistId?: string) => {
          props.playlistsSelection.selectItem({ itemId: playlistId });
          props.playlistsHighlight.set({ itemId: playlistId });
        };
        selectPlaylist(R.head(props.playlists)?.id);
      }
    }, [
      params,
      props.playlists,
      props.playlistsHighlight,
      props.playlistsSelection,
    ]);

    return null;
  }, DefaultProps)
);
