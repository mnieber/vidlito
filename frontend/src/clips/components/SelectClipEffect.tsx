import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useSearchAndUrlParams } from 'src/utils/hooks';

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
  ...dps.playlist,
  ...dps.clips,
  ...dps.urlState,
};

export const SelectClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const params = useSearchAndUrlParams();

    React.useEffect(() => {
      return autorun(() => {
        const clipId = R.find((x: ClipT) => x.slug === params.clipSlug)(
          props.clips
        )?.id;
        if (
          R.isNil(params.clipSlug) ||
          (R.isNil(clipId) && params.clipSlug !== 'new-clip')
        ) {
          // If the clip slug in the url is not valid, then go to the first
          // clip in the playlist.
          const clip = R.head(props.clips);
          if (clip) {
            props.urlState.setClipSlug(clip.slug, true);
          }
        } else if (clipId && !props.clipsSelection.ids.includes(clipId)) {
          props.clipsSelection.selectItem({ itemId: clipId });
        }
      });
    }, [params, props.clips, props.clipsSelection, props.urlState]);

    return null;
  }, DefaultProps)
);
