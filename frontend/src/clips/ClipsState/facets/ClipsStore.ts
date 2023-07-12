import { Store } from 'skandha-facets';
import { ClipT } from '/src/api/types/ClipT';

export class ClipsStore extends Store<ClipT> {
  static className = () => 'ClipsStore';
  static skandhaSymbol = Symbol('ClipsStore');
}
