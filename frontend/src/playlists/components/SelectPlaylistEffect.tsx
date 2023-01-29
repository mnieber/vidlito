import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Selection } from 'skandha-facets/Selection';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Effect } from 'src/utils/components';

type ArgsT = {
  playlistsSelection: Selection;
  playlistId?: string;
  playlistSlug: string;
};

type PropsT = {};

const DefaultProps = {
  ...dps.playlistsSelection,
  ...dps.playlists,
};

export const SelectPlaylistEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <Effect
        getArgs={(params) => {
          return {
            playlistsSelection: props.playlistsSelection,
            playlistId: R.find(
              (x: PlaylistT) => x.slug === params.playlistSlug
            )(props.playlists)?.id,
            playlistSlug: params.playlistSlug,
          };
        }}
        f={(args: ArgsT) => {
          if (args.playlistId) {
            args.playlistsSelection.selectItem({ itemId: args.playlistId });
          }
        }}
      />
    );
  }, DefaultProps)
);
