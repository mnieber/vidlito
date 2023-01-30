import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Selection } from 'skandha-facets/Selection';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useRouteUfns } from 'src/routes/hooks/useRoutes';
import { Effect } from 'src/utils/components';

type ArgsT = {
  clipsSelection: Selection;
  playlist: PlaylistT;
  clipId?: string;
  clipSlug: string;
};

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
  ...dps.clips,
  ...dps.playlist,
};

export const SelectClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { routeUfns, history } = useRouteUfns();

    return (
      <Effect
        getArgs={(params) => {
          return {
            clipsSelection: props.clipsSelection,
            playlist: props.playlist,
            clipId: R.find((x: ClipT) => x.slug === params.clipSlug)(
              props.clips
            )?.id,
            clipSlug: params.clipSlug,
          };
        }}
        f={(args: ArgsT) => {
          if (args.clipSlug === 'new-clip' || R.isNil(args.clipSlug)) {
            const clip = R.head(props.clips);
            if (clip && args.playlist) {
              routeUfns.clip(history.replace)(args.playlist, clip);
            }
          } else if (args.clipId) {
            args.clipsSelection.selectItem({ itemId: args.clipId });
          }
        }}
      />
    );
  }, DefaultProps)
);
