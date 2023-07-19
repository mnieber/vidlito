import { observer } from 'mobx-react-lite';
import React from 'react';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useDelayedFlag } from '/src/utils/hooks/useDelayedFlag';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.playlist,
  ...dps.clip,
  ...dps.dashboardState,
};

export const TrackClipNotFound = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const clipNotFound = useDelayedFlag(
      props.playlist && !props.clip && !isLoading(props.clip),
      500,
      []
    );
    React.useEffect(() => {
      props.dashboardState.setIsClipNotFound(clipNotFound);
    }, [clipNotFound]);
    return null;
  }, DefaultProps)
);
