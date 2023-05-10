import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipsUrlEvents, useUrlEventHandler } from '/src/frames/pages';
import { useSearchAndUrlParams } from '/src/utils/hooks';

const useUrlEvents = () => useUrlEventHandler<typeof ClipsUrlEvents>();

type PropsT = {};

const DefaultProps = {
  ...dps.playlist,
};

export const ForwardToClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEvents();
    const params = useSearchAndUrlParams();

    React.useEffect(() => {
      return autorun(() => {
        if (
          props.playlist &&
          props.playlist.slug === params.playlistSlug &&
          props.playlist.clipSet.length
        ) {
          urlEvents.clipHighlightIsCorrectedTo(props.playlist.clipSet[0].slug);
        }
      });
    }, [params, props.playlist, urlEvents]);

    return null;
  }, DefaultProps)
);
