import * as Skandha from 'skandha';
import { Highlight, Store } from 'skandha-facets';
import { Settings } from './Settings';
import { Pagination } from '/src/api/facets/Pagination';
import { PaginationT } from '/src/api/pagination/types';
import { ActionT } from '/src/api/types/ActionT';

// Local imports
import { Undo } from './facets/Undo';
import { registerActionsCtr } from './registerActionsCtr';

export type PropsT = {
  getActions: () => ActionT[];
  getPagination: () => PaginationT | undefined;
  undoAction: (action: ActionT) => Promise<any>;
};

export class ActionsState {
  props: PropsT;
  settings: Settings;

  actionsCtr = {
    highlight: new Highlight<ActionT>(),
    pagination: new Pagination(),
    store: new Store<ActionT>(),
    undo: new Undo(this),
  };

  getSummary() {
    return {
      actions: Skandha.getCtrState(this.actionsCtr),
    };
  }

  destroy() {
    Skandha.cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;
    this.settings = new Settings({
      actionsPagination: this.actionsCtr.pagination,
    });
    registerActionsCtr(this);
  }
}
