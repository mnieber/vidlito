import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useRefUrl } from '/src/routes/hooks/useRefUrl';
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
    const { playlistsHighlight, playlistsSelection, playlist, playlists } =
      props;

    const params = useParams() as ObjT;
    const { playlistSlug } = params;
    const { updateRefUrl, hasUrlChanged } = useRefUrl();

    React.useEffect(() => {
      // If there is a new url
      if (hasUrlChanged) {
        const getPlaylistForCurrentUrl = () => {
          return R.find((x: PlaylistT) => x.slug === playlistSlug)(playlists);
        };

        const selectPlaylist = (playlist?: PlaylistT) => {
          playlistsSelection.selectItem({ itemId: playlist?.id });
          playlistsHighlight.set({ itemId: playlist?.id });
        };

        const playlistForCurrentUrl = getPlaylistForCurrentUrl();
        if (playlistForCurrentUrl) {
          updateRefUrl();
          if (playlist?.id !== playlistForCurrentUrl.id) {
            selectPlaylist(playlistForCurrentUrl);
          }
        } else {
          selectPlaylist(undefined);
        }
      }
    }, [
      playlistSlug,
      playlist,
      playlists,
      playlistsHighlight,
      playlistsSelection,
    ]);

    return null;
  }, DefaultProps)
);
