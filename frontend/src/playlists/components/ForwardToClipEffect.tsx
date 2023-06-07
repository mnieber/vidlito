import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipsNavEvents, useNavHandler } from '/src/frames/pages';
import { useSearchAndUrlParams } from '/src/utils/hooks';

const useNavEvents = () => useNavHandler<typeof ClipsNavEvents>();

type PropsT = {};

const DefaultProps = {
  ...dps.playlist,
};

export const ForwardToClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const nav = useNavEvents();
    const params = useSearchAndUrlParams();

    React.useEffect(() => {
      return autorun(() => {
        if (
          props.playlist &&
          props.playlist.slug === params.playlistSlug &&
          props.playlist.clipSet.length
        ) {
          nav.clipHighlightIsCorrectedTo(props.playlist.clipSet[0].slug);
        }
      });
    }, [params, props.playlist, nav]);

    return null;
  }, DefaultProps)
);
