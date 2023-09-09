import * as Skandha from 'skandha';
import { Highlight, Store } from 'skandha-facets';
import { Settings } from './Settings';
import { ActionT } from '/src/api/types/ActionT';
import { Pagination } from '/src/playlists/PlaylistsState/facets/Pagination';

// Local imports
import { Undo } from './facets/Undo';
import { registerActionsCtr } from './registerActionsCtr';

export type PropsT = {
  getActions: () => ActionT[];
  undoAction: (action: ActionT) => Promise<any>;
};

export class ActionsState {
  props: PropsT;
  settings = new Settings();

  actionsCtr = {
    highlight: new Highlight<ActionT>(),
    pagination: new Pagination(),
    store: new Store<ActionT>(),
    undo: new Undo(),
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
    registerActionsCtr(this);
  }
}
