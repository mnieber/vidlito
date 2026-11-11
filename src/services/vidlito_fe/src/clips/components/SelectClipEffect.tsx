import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { useNavContext } from 'react-nav-handler';
import { withContextProps } from 'react-props-from-context';
import { useParams } from 'react-router-dom';
import { ClipT } from '/src/api/types/ClipT';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { toClip } from '/src/clips/navFunctions';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { useRefUrl } from '/src/routes/hooks/useRefUrl';
import { UrlEffectView } from '/src/utils/components/UrlEffectView';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const ContextProps = {
  clipsSelection: clipsCtx.clipsSelection,
  playlist: playlistsCtx.playlist,
  clip: clipsCtx.clip,
  clips: clipsCtx.clips,
};

export const SelectClipEffect = observer(
  withContextProps(
    (props: PropsT & typeof ContextProps & typeof ContextProps) => {
      const params = useParams() as ObjT;
      const navContext = useNavContext('SelectClipEffect');
      const { updateRefUrl, hasUrlChanged } = useRefUrl();

      // Define local variables
      const { clips, playlist, clipsSelection } = props;
      const clipFromUrl = R.find((x: ClipT) => x.slug === params.clipSlug)(
        clips
      );
      const firstClip = R.find((x: ClipT) => x.slug !== 'new-clip')(clips);
      const isClipInSyncWithUrl = clipFromUrl?.id === props.clip?.id;

      // Define local functions
      const navToFirstClip = () => {
        if (!R.isNil(firstClip)) {
          navContext.nav(toClip)(
            playlist.ownerUsername,
            playlist.slug,
            firstClip.slug
          );
        }
      };
      const selectClip = (clip?: ClipT) => {
        clipsSelection.selectItem({ itemId: clip?.id });
      };

      React.useEffect(() => {
        // If the playlist for the current slug has been loaded
        if (playlist?.slug === params.playlistSlug) {
          // If we must forward to the first clip
          if (params.clipSlug === '-') {
            navToFirstClip();
          }
          // Else if there is a new url
          else if (hasUrlChanged) {
            if (clipFromUrl) {
              updateRefUrl();
              if (!isClipInSyncWithUrl) {
                selectClip(clipFromUrl);
              }
              document.title = 'Vidlito: ' + clipFromUrl.name;
            } else {
              selectClip(undefined);
            }
          }
        }
      });

      return (
        <UrlEffectView
          resourceName="clip"
          isInSync={isClipInSyncWithUrl}
          className="absolute"
        />
      );
    },
    ContextProps
  )
);
