import { observer } from 'mobx-react-lite';
import { createPlaylist } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Effect } from 'src/utils/components';

type ArgsT = {
  playlistSlug: string;
};

type PropsT = {};

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.playlistsAddition,
};

export const EditPlaylistEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <Effect
        getArgs={(params) => {
          return {
            playlistSlug: params.playlistSlug,
          };
        }}
        f={(args: ArgsT) => {
          if (args.playlistSlug === 'new-playlist') {
            if (!props.playlistsAddition.item) {
              props.dashboardState.setShowClips(false);
              props.playlistsAddition.add(createPlaylist({}));
            }
          }
        }}
      />
    );
  }, DefaultProps)
);
