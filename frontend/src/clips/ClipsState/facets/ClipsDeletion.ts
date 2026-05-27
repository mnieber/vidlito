import * as R from 'ramda';
import { Selection } from 'skandha-facets';
import { correctHighlight } from 'skandha-facets/policies';
import { ClipsState } from '/src/clips/ClipsState';
import { ObjT } from '/src/utils/types';

import { DeletionWithFlag } from './DeletionWithFlag';

export class ClipsDeletion extends DeletionWithFlag {
  constructor(private state: ClipsState) {
    super();
  }

  protected deleteItems(args: {
    itemIds: string[];
    moveToTrash?: boolean;
  }): any {
    const clipIds = args.itemIds;
    const allIds = [...this.state.clipsCtr.highlight.highlightableIds];
    const promise = args.moveToTrash
      ? this.state.props.moveClipsToTrash(clipIds)
      : this.state.props.deleteClips(clipIds);

    return promise.then((response: ObjT) => {
      unselectIds(this.state.clipsCtr.selection, clipIds);
      correctHighlight(
        this.state.clipsCtr.highlight,
        allIds,
        R.without(clipIds, allIds)
      );
      return response;
    });
  }
}

const unselectIds = (selection: Selection, ids: string[]) => {
  for (const id of ids) {
    if (selection.itemIds.includes(id)) {
      selection.selectItem({ itemId: id, isCtrl: true });
    }
  }
};
