import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { navHandler } from '/src/navHandler/NavHandler';
import { useSearchAndUrlParams } from '/src/utils/hooks';
import { pathname } from '/src/utils/urls';

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
    const params = useSearchAndUrlParams();
    const refUrl = React.useRef<string>("");

    React.useEffect(() => {
      return autorun(() => {
        // If there is a new url
        if (refUrl.current !== pathname()) {
          if (
            params.clipSlug === 'new-clip' &&
            !props.clipsAddition.item &&
            props.userProfile
          ) {
            refUrl.current = pathname();
            props.clipsAddition.add({
              values: createClip(props.userProfile, {}),
            });
          } else {
            const clip =
              R.find((x: ClipT) => x.slug === params.clipSlug)(props.clips) ??
              R.head(props.clips);
            if (clip) {
              refUrl.current = pathname();
              if (props.clip?.id !== clip.id) {
                props.clipsSelection.selectItem({ itemId: clip?.id });
              }
            }
          }
        } else {
          if (props.clip && navHandler.getParams().clipSlug !== props.clip.slug) {
            navToClip(props.clip.slug);
          }
        }
      });
    }, [params, props.clips, props.clipsSelection, props.clipsHighlight]);

    return null;
  }, DefaultProps)
);
