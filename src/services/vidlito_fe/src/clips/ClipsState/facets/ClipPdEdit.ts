import { Edit } from 'skandha-facets';
import { ClipsState } from '/src/clips/ClipsState';

export class ClipPdEdit extends Edit {
  constructor(private state: ClipsState) {
    super();
  }

  protected saveItem(args: { values: any }): any {
    return this.state.props.saveClipPd(args.values);
  }
}
