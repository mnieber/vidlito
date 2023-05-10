import { setCallbackMap } from 'aspiration';
import * as R from 'ramda';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import {
  AdditionCbs,
  DeletionCbs,
  EditCbs,
  HighlightCbs,
  InsertionCbs,
  Selection,
  SelectionCbs,
  handleSelectItem,
  topOfTheList,
} from 'skandha-facets';
import { correctHighlight } from 'skandha-facets/policies';
import { ClipT } from '/src/api/types/ClipT';
import { ClipsState, PropsT } from '/src/clips/ClipsState';
import { MoveCbs } from '/src/clips/ClipsState/facets/Move';
import { ObjT } from '/src/utils/types';

export const initClips = (state: ClipsState, props: PropsT) => {
  const ctr = state.clipsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.addition, {
    add: {
      stageAdd() {
        ctr.addition.parentId = ctr.highlight.id || topOfTheList;
      },
      highlightNewItem() {
        ctr.selection.selectItem({ itemId: ctr.addition.item?.id });
        ctr.edit.enable();
      },
    },
    cancel: {
      unstageAdd() {
        ctr.edit.cancel();
      },
    },
  } as AdditionCbs<ClipT>);

  setCallbackMap(ctr.deletion, {
    delete: {
      deleteItems(this: DeletionCbs['delete']) {
        const clipIds = this.args.itemIds;
        if (this.args.moveToTrash) {
          const allIds = [...ctr.highlight.highlightableIds];

          return props.moveClipsToTrash(clipIds).then((response: ObjT) => {
            unselectIds(ctr.selection, clipIds);
            correctHighlight(ctr.highlight, allIds, R.without(clipIds, allIds));
            return response;
          });
        }
        return Promise.resolve();
      },
    },
  } as DeletionCbs);

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return props.saveClip(this.args.values).then((localClip: ClipT) => {
          ctr.addition.confirm();
          return localClip;
        });
      },
    },
    cancel: {
      onCancel() {
        ctr.addition.cancel();
      },
    },
  } as EditCbs);

  setCallbackMap(ctr.highlight, {
    highlightItem: {
      enter(this: HighlightCbs['highlightItem']) {
        // Cancel adding a new item on highlight change
        if (ctr.addition.item && ctr.addition.item.id !== this.args.id) {
          ctr.addition.cancel();
        }
      },
    },
  } as HighlightCbs);

  setCallbackMap(ctr.insertion, {
    insertItems: {
      insertItems(clips: ClipT[]) {
        props.saveClipOrdering(clips);
      },
    },
  } as InsertionCbs);

  setCallbackMap(ctr.move, {
    move: {
      moveItems(this: MoveCbs['move']) {
        const allIds = [...ctr.highlight.highlightableIds];
        const clips = [...ctr.selection.items];
        const clipIds = [...ctr.selection.ids];

        return props
          .moveClipsToPlaylist(clips, this.args.playlistId, this.args.copy)
          .then((response: ObjT) => {
            unselectIds(ctr.selection, clipIds);
            correctHighlight(ctr.highlight, allIds, R.without(clipIds, allIds));
            return response;
          });
      },
    },
  } as MoveCbs);

  setCallbackMap(ctr.selection, {
    selectItem: {
      selectItem(this: SelectionCbs['selectItem']) {
        handleSelectItem(ctr.selection, this.args);
        // Highlight follows selection
        if (!this.args.isCtrl && !this.args.isShift) {
          ctr.highlight.highlightItem({ id: this.args.itemId });
        }
      },
    },
  } as SelectionCbs);
};

export const unselectIds = (selection: Selection, ids: string[]) => {
  for (const id of ids) {
    if (selection.ids.includes(id)) {
      selection.selectItem({ itemId: id, isCtrl: true });
    }
  }
};
