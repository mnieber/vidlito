import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { useNavContext } from 'react-nav-handler';
import { useParams } from 'react-router-dom';
import { ClipT } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { toClip } from '/src/clips/navFunctions';
import { useRefUrl } from '/src/routes/hooks/useRefUrl';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
  ...dps.playlist,
  ...dps.clips,
  ...dps.clip,
};

export const SyncClipWithUrlEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const navContext = useNavContext('SyncClipWithUrlEffect');
    const { clips, playlist, clipsSelection } = props;

    const params = useParams() as ObjT;
    const { clipSlug, playlistSlug } = params;
    const { updateRefUrl, hasUrlChanged } = useRefUrl();

    React.useEffect(() => {
      // If the playlist for the current slug has been loaded
      if (playlist?.slug === playlistSlug) {
        // If we must forward to the first clip
        if (clipSlug === '-') {
          const clip = R.find((x: ClipT) => x.slug !== 'new-clip')(clips);
          if (!R.isNil(clip)) {
            navContext.nav(toClip)(
              playlist.ownerUsername,
              playlist.slug,
              clip.slug
            );
          }
        }
        // Else if there is a new url
        else if (hasUrlChanged) {
          const clipForCurrentUrl = R.find((x: ClipT) => x.slug === clipSlug)(
            clips
          );
          if (clipForCurrentUrl) {
            updateRefUrl();
            if (props.clip?.id !== clipForCurrentUrl.id) {
              clipsSelection.selectItem({ itemId: clipForCurrentUrl.id });
            }
            document.title = 'Vidlito: ' + clipForCurrentUrl.name;
          }
        }
      }
    }, [clipSlug, props.clip, playlist, clips, clipsSelection]);

    return null;
  }, DefaultProps)
);
