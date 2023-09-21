import { getc, getf } from 'skandha';
import { PlaylistT } from '/src/api/types/PlaylistT';

import {
  DragAndDrop,
  HoverPositionT,
  Insertion,
  Selection,
} from 'skandha-facets';
import { getIds } from '/src/utils/ids';

export function followedSelectedPlaylistsAreInsertedOnDrop(
  facet: DragAndDrop,
  hoverPosition: HoverPositionT,
  followedPlaylists: PlaylistT[]
) {
  const ctr = getc(facet);
  const selection = getf(Selection, ctr);
  const followedPlaylistIds = getIds(followedPlaylists);
  const followedIds = (selection.itemIds || []).filter((id: string) =>
    followedPlaylistIds.includes(id)
  );
  const items = followedIds
    .map((id: string) => ctr.store.itemById[id])
    .sort(
      (a: PlaylistT, b: PlaylistT) =>
        selection.selectableIds.indexOf(a.id) -
        selection.selectableIds.indexOf(b.id)
    );

  getf(Insertion, ctr).insertItems({
    hoverPosition: {
      ...hoverPosition,
      payload: items,
    },
  });
}
