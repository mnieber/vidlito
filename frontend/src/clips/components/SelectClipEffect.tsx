import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Selection } from 'skandha-facets/Selection';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Effect } from 'src/utils/components';

type ArgsT = {
  clipsSelection: Selection;
  clips: ClipT[];
  clipSlug: string;
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
            clips: props.clips,
            clipSlug: params.clipSlug,
          };
        }}
        f={(args: ArgsT) => {
          const clipId = R.find((x: ClipT) => x.slug === args.clipSlug)(
            args.clips
          )?.id;
          if (clipId) {
            args.clipsSelection.selectItem({ itemId: clipId });
          }
        }}
      />
    );
  }, DefaultProps)
);
