import { observer } from 'mobx-react-lite';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { useParams } from 'wouter';
import { createClip } from '/src/api/types/ClipT';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const ContextProps = {
  clipsHighlight: clipsCtx.clipsHighlight,
  clipsAddition: clipsCtx.clipsAddition,
  playlist: playlistsCtx.playlist,
  userProfile: dashboardCtx.userProfile,
};

export const AddNewClipEffect = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const { userProfile, clipsAddition, playlist, clipsHighlight } = props;

    const params = useParams() as ObjT;
    const { clipSlug, playlistSlug } = params;

    React.useEffect(() => {
      const mustAddNewClip =
        clipSlug === 'new-clip' &&
        userProfile &&
        !clipsAddition.item &&
        !clipsHighlight.itemId;

      // If the playlist for the current slug has been loaded
      if (mustAddNewClip && playlist?.slug === playlistSlug) {
        clipsAddition.add({
          values: createClip(userProfile, {}),
        });
      }
    }, [clipSlug, playlist]);

    return null;
  }, ContextProps)
);
