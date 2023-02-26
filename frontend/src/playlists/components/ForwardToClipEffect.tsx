import { observer } from 'mobx-react-lite';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Effect } from 'src/utils/components';

type ArgsT = {
  playlist?: PlaylistT;
};

type PropsT = {};

const DefaultProps = {
  ...dps.playlist,
  ...dps.urlState,
};

export const ForwardToClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <Effect
        getArgs={(params) => {
          return {
            playlist: props.playlist,
          };
        }}
        f={(args: ArgsT) => {
          if (args.playlist) {
            props.urlState.setClipSlug(args.playlist.clipSet[0].slug, true);
          }
        }}
      />
    );
  }, DefaultProps)
);
