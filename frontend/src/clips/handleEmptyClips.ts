import { Highlight } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { navToClip } from '/src/clips/ClipsNavEvents';

export const handleEmptyClips = (
  clipsHighlight: Highlight,
  playlist: PlaylistT
) => {
  return (response: any) => {
    if (clipsHighlight.id === undefined) {
      navToClip(playlist.ownerUsername, playlist.slug, '-');
    }
  };
};
