import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipsUrlEvents, useUrlEventHandler } from 'src/frames/pages';
import { useSearchAndUrlParams } from 'src/utils/hooks';

const useUrlEvents = () => useUrlEventHandler<typeof ClipsUrlEvents>();

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
  ...dps.clipsHighlight,
  ...dps.playlist,
  ...dps.clips,
};

export const SelectClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEvents();
    const params = useSearchAndUrlParams();

    React.useEffect(() => {
      return autorun(() => {
        const clipId = R.find((x: ClipT) => x.slug === params.clipSlug)(
          props.clips
        )?.id;
        // If the clip slug in the url is missing or invalid, then go to the first
        // clip in the playlist.
        if (
          R.isNil(params.clipSlug) ||
          (props.clips.length &&
            R.isNil(clipId) &&
            params.clipSlug !== 'new-clip')
        ) {
          const clip = R.head(props.clips);
          if (clip) {
            urlEvents.clipHighlightIsCorrectedTo(clip.slug);
          }
        }
        // If the clip slug in the url is valid, but the corresponding clipId is
        // not highlighted, then select it.
        else if (clipId && props.clipsHighlight.id !== clipId) {
          props.clipsSelection.selectItem({ itemId: clipId });
        }
      });
    }, [
      params,
      props.clips,
      props.clipsSelection,
      props.clipsHighlight,
      urlEvents,
    ]);

    return null;
  }, DefaultProps)
);
