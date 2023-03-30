import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { createClip } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useSearchAndUrlParams } from 'src/utils/hooks';

type PropsT = {};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.clipsAddition,
  ...dps.userProfile,
};

export const EditClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const params = useSearchAndUrlParams();

    React.useEffect(() => {
      return autorun(() => {
        if (params.clipSlug === 'new-clip') {
          if (!props.clipsAddition.item) {
            props.clipsAddition.add(createClip({}));
          }
        }
      });
    }, [params, props.dashboardState, props.clipsAddition]);

    return null;
  }, DefaultProps)
);
