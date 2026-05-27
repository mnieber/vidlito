import { Addition, topOfTheList } from 'skandha-facets';
import * as FacetPolicies from 'skandha-facets/policies';
import { ClipT } from '/src/api/types/ClipT';
import { ClipsState } from '/src/clips/ClipsState';

export class ClipsAddition extends Addition<ClipT> {
  constructor(private state: ClipsState) {
    super();
  }

  protected stageAdd(): void {
    this.parentId = this.state.clipsCtr.highlight.itemId || topOfTheList;
  }

  protected highlightNewItem(): void {
    this.state.clipsCtr.selection.selectItem({ itemId: this.item?.id });
    this.state.clipsCtr.edit.enable();
  }

  protected confirmAdd(): void {
    FacetPolicies.newItemsAreInsertedWhenConfirmed(this);
  }
}
