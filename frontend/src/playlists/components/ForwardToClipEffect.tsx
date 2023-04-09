import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipsPageEventsT, usePageEventHandler } from 'src/frames/pages';
import { useSearchAndUrlParams } from 'src/utils/hooks';

export type PageEventsT = ClipsPageEventsT;

type PropsT = {};

const DefaultProps = {
  ...dps.playlist,
};

export const ForwardToClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const pageEvents = usePageEventHandler<PageEventsT>();
    const params = useSearchAndUrlParams();

    React.useEffect(() => {
      return autorun(() => {
        if (
          props.playlist &&
          props.playlist.slug === params.playlistSlug &&
          props.playlist.clipSet.length
        ) {
          pageEvents.clipHighlightIsCorrectedTo(props.playlist.clipSet[0].slug);
        }
      });
    }, [params, props.playlist, pageEvents]);

    return null;
  }, DefaultProps)
);
