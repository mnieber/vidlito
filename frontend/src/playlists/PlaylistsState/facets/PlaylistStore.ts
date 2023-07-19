import { Store } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';

export class PlaylistStore extends Store<PlaylistT> {
  static className = () => 'PlaylistStore';
  static skandhaSymbol = Symbol('PlaylistStore');
}
