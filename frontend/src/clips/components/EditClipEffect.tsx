import { observer } from 'mobx-react-lite';
import { createClip } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Effect } from 'src/utils/components';

type ArgsT = {
  clipSlug: string;
};

type PropsT = {};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.clipsAddition,
  ...dps.userProfile,
};

export const EditClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <Effect
        getArgs={(params) => {
          return {
            clipSlug: params.clipSlug,
          };
        }}
        f={(args: ArgsT) => {
          if (args.clipSlug === 'new-clip') {
            if (!props.clipsAddition.item) {
              props.dashboardState.setShowClips(true);
              props.clipsAddition.add(createClip({}));
            }
          }
        }}
      />
    );
  }, DefaultProps)
);
