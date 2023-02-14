import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Effect } from 'src/utils/components';

type ArgsT = {
  playlistId?: string;
  playlistSlug: string;
};

type PropsT = {};

const DefaultProps = {
  ...dps.playlistsSelection,
  ...dps.playlistsHighlight,
  ...dps.playlists,
  ...dps.playlistsState,
};

export const SelectPlaylistEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <Effect
        getArgs={(params) => {
          return {
            playlistId: R.find(
              (x: PlaylistT) => x.slug === params.playlistSlug
            )(props.playlists)?.id,
            playlistSlug: params.playlistSlug,
          };
        }}
        f={(args: ArgsT) => {
          props.playlistsState.playlists.data.setPlaylistSlug(
            args.playlistSlug
          );
          if (
            args.playlistId &&
            !props.playlistsSelection.ids.includes(args.playlistId)
          ) {
            props.playlistsSelection.selectItem({ itemId: args.playlistId });
            props.playlistsHighlight.highlightItem(args.playlistId);
          }
        }}
      />
    );
  }, DefaultProps)
);
