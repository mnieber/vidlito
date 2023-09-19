import { type NavContextT } from 'react-nav-handler';
import { Highlight } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { navToClip } from '/src/clips/navFunctions';

export const handleEmptyClips = (
  navContext: NavContextT,
  clipsHighlight: Highlight,
  playlist: PlaylistT
) => {
  return (response: any) => {
    if (clipsHighlight.id === undefined) {
      navToClip(navContext)(playlist.ownerUsername, playlist.slug, '-').go();
    }
    return response;
  };
};
