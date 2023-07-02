import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { isLoading } from '/src/api/getState';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
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
        const mustAddNewClip =
          params.clipSlug === 'new-clip' &&
          !props.clipsAddition.item &&
          props.userProfile;

        const addNewClip = () => {
          props.clipsAddition.add({
            values: createClip(props.userProfile, {}),
          });
        };

        const getClipForCurrentUrl = () => {
          return (
            R.find((x: ClipT) => x.slug === params.clipSlug)(props.clips) ??
            R.head(props.clips)
          );
        };

        const selectClip = (clip: ClipT) => {
          props.clipsSelection.selectItem({ itemId: clip?.id });
        };

        if (mustAddNewClip) {
          refUrl.current = location.pathname;
          addNewClip();
        } else if (props.playlist && !isLoading(props.clips)) {
          refUrl.current = location.pathname;
          const clipForCurrentUrl = getClipForCurrentUrl();
          if (clipForCurrentUrl) {
            if (props.clip?.id !== clipForCurrentUrl.id) {
              selectClip(clipForCurrentUrl);
            }
          }
        }
      } else {
        if (props.clip && params.clipSlug !== props.clip.slug) {
          navToClip(props.playlist, props.clip.slug);
        }
      }
    }, [params, props.clip, props.clips, props.clipsSelection]);

    return null;
  }, DefaultProps)
);
