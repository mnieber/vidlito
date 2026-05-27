import { Addition, topOfTheList } from 'skandha-facets';
import * as FacetPolicies from 'skandha-facets/policies';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

export class PlaylistsAddition extends Addition<PlaylistT> {
  constructor(private state: PlaylistsState) {
    super();
  }

  protected stageAdd(): void {
    this.parentId = this.state.playlistsCtr.highlight.itemId || topOfTheList;
  }

  protected highlightNewItem(): void {
    this.state.playlistsCtr.selection.selectItem({ itemId: this.item?.id });
    this.state.playlistsCtr.highlight.set({ itemId: this.item?.id });
    this.state.playlistsCtr.edit.enable();
  }

  protected unstageAdd(parentId: string | undefined): void {
    this.state.playlistsCtr.edit.cancel();
    const itemId =
      (parentId === topOfTheList ? undefined : parentId) ??
      this.state.playlistsCtr.selection.selectableIds[0] ??
      this.state.playlistsCtr.store.items?.[0]?.id;
    this.state.playlistsCtr.selection.selectItem({ itemId: itemId });
    this.state.playlistsCtr.highlight.set({ itemId: itemId });
  }

  protected confirmAdd(): void {
    FacetPolicies.newItemsAreInsertedWhenConfirmed(this);
  }
}
