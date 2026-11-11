import { Edit } from 'skandha-facets';
import { ClipsState } from '/src/clips/ClipsState';
import { ObjT } from '/src/utils/types';

export class ClipsEdit extends Edit {
  constructor(private state: ClipsState) {
    super();
  }

  protected saveItem(args: { values: any }): any {
    return this.state.props.saveClip(args.values).then((response: ObjT) => {
      this.state.clipsCtr.addition.confirm();
      return response;
    });
  }

  protected onCancel(): void {
    this.state.clipsCtr.addition.cancel();
  }
}
