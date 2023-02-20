import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Effect } from 'src/utils/components';

type ArgsT = {
  playlist?: PlaylistT;
  playlistSlug: string;
};

type PropsT = {};

const DefaultProps = {
  ...dps.urlState,
  ...dps.dashboardState,
  ...dps.playlists,
  ...dps.playlistsHighlight,
  ...dps.playlistsSelection,
};

export const SelectPlaylistEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <Effect
        getArgs={(params) => {
          return {
            playlist: R.find((x: PlaylistT) => x.slug === params.playlistSlug)(
              props.playlists
            ),
            playlistSlug: params.playlistSlug,
          };
        }}
        f={(args: ArgsT) => {
          props.urlState.setPlaylistSlug(args.playlistSlug, false);
          if (
            args.playlist &&
            !props.playlistsSelection.ids.includes(args.playlist.id)
          ) {
            props.playlistsSelection.selectItem({ itemId: args.playlist.id });
            props.playlistsHighlight.highlightItem(args.playlist.id);
          }
        }}
      />
    );
  }, DefaultProps)
);
