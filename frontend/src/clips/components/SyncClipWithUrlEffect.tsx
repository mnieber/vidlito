import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import * as R from 'ramda';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/navEvents';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
  ...dps.clipsAddition,
  ...dps.playlist,
  ...dps.clips,
  ...dps.clip,
  ...dps.userProfile,
  ...dps.videoController,
};

export const SyncClipWithUrlEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { userProfile, clipsAddition, clips, playlist, clipsSelection } =
      props;

    const location = useLocation();
    const params = useParams() as ObjT;
    const { clipSlug, playlistSlug } = params;
    const refUrl = React.useRef<string>('');

    React.useEffect(() => {
      const selectClip = (clip?: ClipT) => {
        clipsSelection.selectItem({ itemId: clip?.id });
      };

      const mustAddNewClip =
        clipSlug === 'new-clip' && !clipsAddition.item && userProfile;

      const addNewClip = () => {
        const videoTimeInS =
          props.videoController?.getPlayer()?.getCurrentTime() ?? 0;
        clipsAddition.add({
          values: createClip(userProfile, {
            url: props.clip?.url,
            startTimeMs: videoTimeInS * 1000,
          }),
        });
      };

      // If the playlist for the current slug has been loaded
      if (playlist?.slug === playlistSlug) {
        // If we must forward to the first clip
        if (clipSlug === '-') {
          const clip = R.find((x: ClipT) => x.slug !== 'new-clip')(clips);
          if (!R.isNil(clip)) {
            navToClip(playlist.ownerUsername, playlist.slug, clip.slug);
          } else {
            clipsAddition.cancel();
            selectClip(undefined);
          }
        } else if (mustAddNewClip) {
          addNewClip();
        }
        // If there is a new url
        else if (refUrl.current !== location.pathname) {
          const clipForCurrentUrl = R.find((x: ClipT) => x.slug === clipSlug)(
            clips
          );
          if (playlist && !isLoading(clips) && clipForCurrentUrl) {
            refUrl.current = location.pathname;
            if (props.clip?.id !== clipForCurrentUrl.id) {
              selectClip(clipForCurrentUrl);
            }
            document.title = 'Vidlito: ' + clipForCurrentUrl.name;
          }
        } else {
          if (props.clip && clipSlug !== props.clip.slug) {
            navToClip(playlist.ownerUsername, playlist.slug, props.clip.slug);
          }
        }
      } else if (playlistSlug === 'new-playlist') {
        refUrl.current = location.pathname;
      }
    }, [clipSlug, props.clip, playlist, clips, clipsSelection]);

    return null;
  }, DefaultProps)
);
