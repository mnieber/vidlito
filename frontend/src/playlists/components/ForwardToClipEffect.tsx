import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navUserHighlightsClip } from '/src/clips/ClipsNavEvents';
import { useSearchAndUrlParams } from '/src/utils/hooks';

type PropsT = {};

const DefaultProps = {
  ...dps.playlist,
};

export const ForwardToClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const params = useSearchAndUrlParams();

    React.useEffect(() => {
      return autorun(() => {
        if (
          props.playlist &&
          props.playlist.slug === params.playlistSlug &&
          props.playlist.clipSet.length
        ) {
          navUserHighlightsClip(props.playlist.clipSet[0].slug);
        }
      });
    }, [params, props.playlist]);

    return null;
  }, DefaultProps)
);
