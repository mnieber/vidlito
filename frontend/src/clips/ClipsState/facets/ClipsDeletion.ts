import * as R from 'ramda';
import { correctHighlight } from 'skandha-facets/policies';
import { ClipsState } from '/src/clips/ClipsState';
import { ObjT } from '/src/utils/types';

import { DeletionWithFlag } from './DeletionWithFlag';
import { unselectIds } from '../registerClipsCtr';

export class ClipsDeletion extends DeletionWithFlag {
  constructor(private state: ClipsState) {
    super();
  }

  protected deleteItems(args: { itemIds: string[]; moveToTrash?: boolean }): any {
    const clipIds = args.itemIds;
    const allIds = [...this.state.clipsCtr.highlight.highlightableIds];
    const promise = args.moveToTrash
      ? this.state.props.moveClipsToTrash(clipIds)
      : this.state.props.deleteClips(clipIds);

    return promise.then((response: ObjT) => {
      unselectIds(this.state.clipsCtr.selection, clipIds);
      correctHighlight(this.state.clipsCtr.highlight, allIds, R.without(clipIds, allIds));
      return response;
    });
  }
}
