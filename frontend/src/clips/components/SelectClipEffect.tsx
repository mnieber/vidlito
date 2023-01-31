import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Selection } from 'skandha-facets/Selection';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Effect } from 'src/utils/components';

type ArgsT = {
  clipsSelection: Selection;
  clipId?: string;
  clipSlug: string;
};

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
  ...dps.clips,
  ...dps.locationState,
};

export const SelectClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <Effect
        getArgs={(params) => {
          return {
            clipsSelection: props.clipsSelection,
            clipId: R.find((x: ClipT) => x.slug === params.clipSlug)(
              props.clips
            )?.id,
            clipSlug: params.clipSlug,
          };
        }}
        f={(args: ArgsT) => {
          if (R.isNil(args.clipSlug) || R.isNil(args.clipId)) {
            const clip = R.head(props.clips);
            if (clip) {
              props.locationState.goToClip(clip);
            }
          } else if (args.clipId) {
            args.clipsSelection.selectItem({ itemId: args.clipId });
          }
        }}
      />
    );
  }, DefaultProps)
);
