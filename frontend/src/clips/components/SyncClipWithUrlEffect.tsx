import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipsNavEvents, useNavHandler } from '/src/frames/pages';
import { useSearchAndUrlParams } from '/src/utils/hooks';

const useNavEvents = () => useNavHandler<typeof ClipsNavEvents>();

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
  ...dps.clipsHighlight,
  ...dps.clipsAddition,
  ...dps.playlist,
  ...dps.clips,
  ...dps.userProfile,
};

export const SyncClipWithUrlEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const nav = useNavEvents();
    const params = useSearchAndUrlParams();
    const refSyncFromUrl = React.useRef(true);

    React.useEffect(() => {
      return autorun(() => {
        // If the effect is mounting then sync from the url to the state.
        if (refSyncFromUrl.current) {
          if (
            params.clipSlug === 'new-clip' &&
            !props.clipsAddition.item &&
            props.userProfile
          ) {
            refSyncFromUrl.current = false;
            props.clipsAddition.add({
              values: createClip(props.userProfile, {}),
            });
          } else {
            const clip =
              R.find((x: ClipT) => x.slug === params.clipSlug)(props.clips) ??
              R.head(props.clips);
            if (clip) {
              refSyncFromUrl.current = false;
              props.clipsSelection.selectItem({ itemId: clip?.id });
            }
          }
        }
        // Else try to sync from the state to the url
        else {
          const clip = props.clipsHighlight.item;
          if (clip && clip.slug !== params.clipSlug) {
            nav.correctClipSlugUrlParam(clip.slug);
          }
        }
      });
    }, [params, props.clips, props.clipsSelection, props.clipsHighlight, nav]);

    return null;
  }, DefaultProps)
);
