import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Selection } from 'skandha-facets/Selection';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Effect } from 'src/utils/components';

type ArgsT = {
  clipsSelection: Selection;
  clipId?: string;
};

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
  ...dps.clips,
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
          };
        }}
        f={(args: ArgsT) => {
          if (args.clipId) {
            args.clipsSelection.selectItem({ itemId: args.clipId });
          }
        }}
      />
    );
  }, DefaultProps)
);
