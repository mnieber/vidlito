import { Insertion } from 'skandha-facets';
import { ClipT } from '/src/api/types/ClipT';
import { ClipsState } from '/src/clips/ClipsState';

export class ClipsInsertion extends Insertion<ClipT> {
  constructor(private state: ClipsState) {
    super();
  }

  protected performInsertion(clips: ClipT[]): any {
    return this.state.props.saveClipOrdering(clips);
  }
}
