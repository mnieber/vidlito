import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Effect } from 'src/utils/components';

type ArgsT = {
  clipId?: string;
  clipSlug: string;
  clips: ClipT[];
  playlist: PlaylistT;
};

type PropsT = {};

const DefaultProps = {
  ...dps.clipsSelection,
  ...dps.playlist,
  ...dps.clips,
  ...dps.urlState,
};

export const SelectClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <Effect
        getArgs={(params) => {
          return {
            clipId: R.find((x: ClipT) => x.slug === params.clipSlug)(
              props.clips
            )?.id,
            clipSlug: params.clipSlug,
            clips: props.clips,
            playlist: props.playlist,
          };
        }}
        f={(args: ArgsT) => {
          if (
            R.isNil(args.clipSlug) ||
            (R.isNil(args.clipId) && args.clipSlug !== 'new-clip')
          ) {
            // If the clip slug in the url is not valid, then go to the first
            // clip in the playlist.
            const clip = R.head(args.clips);
            if (clip) {
              props.urlState.setClipSlug(clip.slug, true);
            }
          } else if (
            args.clipId &&
            !props.clipsSelection.ids.includes(args.clipId)
          ) {
            props.clipsSelection.selectItem({ itemId: args.clipId });
          }
        }}
      />
    );
  }, DefaultProps)
);
