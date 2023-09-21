import { type NavContext } from 'react-nav-handler';
import { Highlight } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { toClip } from '/src/clips/navFunctions';

export const handleEmptyClips = (
  navContext: NavContext,
  clipsHighlight: Highlight,
  playlist: PlaylistT
) => {
  return (response: any) => {
    if (clipsHighlight.itemId === undefined) {
      navContext.nav(toClip)(playlist.ownerUsername, playlist.slug, '-');
    }
    return response;
  };
};
