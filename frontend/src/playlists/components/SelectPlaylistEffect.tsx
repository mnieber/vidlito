import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useRefUrl } from '/src/routes/hooks/useRefUrl';
import { UrlEffectView } from '/src/utils/components';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const DefaultProps = {
  ...dps.playlists,
  ...dps.playlist,
  ...dps.playlistsHighlight,
  ...dps.playlistsSelection,
};

export const SelectPlaylistEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const params = useParams() as ObjT;
    const { updateRefUrl, hasUrlChanged } = useRefUrl();

    // Define local variables
    const { playlistsHighlight, playlistsSelection, playlist, playlists } =
      props;
    const playlistFromUrl = R.find(
      (x: PlaylistT) => x.slug === params.playlistSlug
    )(playlists);
    const isPlaylistInSyncWithUrl = playlist?.id === playlistFromUrl?.id;

    // Define local functions
    const selectPlaylist = (playlist?: PlaylistT) => {
      playlistsSelection.selectItem({ itemId: playlist?.id });
      playlistsHighlight.set({ itemId: playlist?.id });
    };

    React.useEffect(() => {
      // If there is a new url
      if (hasUrlChanged) {
        if (playlistFromUrl) {
          updateRefUrl();
          if (!isPlaylistInSyncWithUrl) {
            selectPlaylist(playlistFromUrl);
          }
        } else {
          selectPlaylist(undefined);
        }
      }
    });

    return (
      <UrlEffectView
        resourceName="playlist"
        isInSync={isPlaylistInSyncWithUrl}
        className="absolute"
      />
    );
  }, DefaultProps)
);
