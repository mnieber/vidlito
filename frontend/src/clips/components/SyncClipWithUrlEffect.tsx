import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { isLoading } from '/src/api/getState';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
  ...dps.clipsHighlight,
  ...dps.clipsAddition,
  ...dps.playlist,
  ...dps.clips,
  ...dps.clip,
  ...dps.userProfile,
};

export const SyncClipWithUrlEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const location = useLocation();
    const params = useParams() as ObjT;
    const refUrl = React.useRef<string>('');

    React.useEffect(() => {
      // If there is a new url
      if (refUrl.current !== location.pathname) {
        if (
          params.clipSlug === 'new-clip' &&
          !props.clipsAddition.item &&
          props.userProfile
        ) {
          refUrl.current = location.pathname;
          props.clipsAddition.add({
            values: createClip(props.userProfile, {}),
          });
        } else if (props.playlist && !isLoading(props.clips)) {
          refUrl.current = location.pathname;
          const clip =
            R.find((x: ClipT) => x.slug === params.clipSlug)(props.clips) ??
            R.head(props.clips);
          if (clip) {
            if (props.clip?.id !== clip.id) {
              props.clipsSelection.selectItem({ itemId: clip?.id });
            }
          }
        }
      } else {
        if (props.clip && params.clipSlug !== props.clip.slug) {
          navToClip(props.clip.slug);
        } else if (!isLoading(props.clips) && props.clips.length === 0) {
          navToPlaylist(props.playlist.slug);
        }
      }
    }, [
      params,
      props.clip,
      props.clips,
      props.clipsSelection,
      props.clipsHighlight,
    ]);

    return null;
  }, DefaultProps)
);
