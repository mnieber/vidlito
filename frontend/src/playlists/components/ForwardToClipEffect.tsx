import { observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router-dom';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const DefaultProps = {
  ...dps.playlist,
  ...dps.clips,
};

export const ForwardToClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const params = useParams() as ObjT;

    React.useEffect(() => {
      if (!params.clipSlug && isLoading(props.clips)) {
        navToClip('-');
      }
    }, [props.playlist, props.clips]);

    return null;
  }, DefaultProps)
);
