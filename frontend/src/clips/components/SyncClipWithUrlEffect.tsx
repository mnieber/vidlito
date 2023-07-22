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
    const { userProfile, clipsAddition, clips, clipsSelection } = props;

    const location = useLocation();
    const params = useParams() as ObjT;
    const { clipSlug } = params;
    const refUrl = React.useRef<string>('');

    React.useEffect(() => {
      // If there is a new url
      if (refUrl.current !== location.pathname) {
        const mustAddNewClip = () =>
          clipSlug === 'new-clip' && !clipsAddition.item && userProfile;

        const addNewClip = () => {
          clipsAddition.add({ values: createClip(userProfile, {}) });
        };

        const getClipForCurrentUrl = () =>
          R.find((x: ClipT) => x.slug === clipSlug)(clips) ??
          (clipSlug === '-' ? R.head(clips) : undefined);

        const selectClip = (clip?: ClipT) => {
          clipsSelection.selectItem({ itemId: clip?.id });
        };

        // refUrl.current = '';
        if (mustAddNewClip()) {
          refUrl.current = location.pathname;
          addNewClip();
        } else if (props.playlist && !isLoading(clips)) {
          const clipForCurrentUrl = getClipForCurrentUrl();
          if (clipForCurrentUrl) {
            refUrl.current = location.pathname;
            if (props.clip?.id !== clipForCurrentUrl.id) {
              selectClip(clipForCurrentUrl);
            }
          } else if (clipSlug === '-') {
            selectClip(undefined);
          }
        }
      } else {
        if (props.clip && clipSlug !== props.clip.slug) {
          navToClip(
            props.playlist.ownerUsername,
            props.playlist.slug,
            props.clip.slug
          );
        }
      }
    }, [clipSlug, props.clip, clips, clipsSelection]);

    return null;
  }, DefaultProps)
);
