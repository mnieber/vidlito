import { data } from 'skandha';
import { Store } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';

export class PlaylistStore extends Store<PlaylistT> {
  @data followedPlaylists: PlaylistT[] = [];
}
