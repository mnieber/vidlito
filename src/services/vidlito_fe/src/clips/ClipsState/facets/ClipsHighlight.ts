import { Highlight } from 'skandha-facets';
import { ClipT } from '/src/api/types/ClipT';
import { ClipsState } from '/src/clips/ClipsState';

export class ClipsHighlight extends Highlight<ClipT> {
  constructor(private state: ClipsState) {
    super();
  }

  protected onSet(args: { itemId: string | undefined }): void {
    // Cancel adding a new item on highlight change
    if (this.state.clipsCtr.addition.item && this.state.clipsCtr.addition.item.id !== args.itemId) {
      this.state.clipsCtr.addition.cancel();
    }
  }
}
