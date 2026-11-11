import { Selection, handleSelectItem } from 'skandha-facets';
import { ClipT } from '/src/api/types/ClipT';
import { ClipsState } from '/src/clips/ClipsState';

export class ClipsSelection extends Selection<ClipT> {
  constructor(private state: ClipsState) {
    super();
  }

  protected performSelection(args: {
    itemId: string | undefined;
    isShift?: boolean;
    isCtrl?: boolean;
    context?: any;
  }): void {
    handleSelectItem(this, args);
    // Highlight follows selection
    if (!args.isCtrl && !args.isShift) {
      this.state.clipsCtr.highlight.set({ itemId: args.itemId });
    }
  }
}
