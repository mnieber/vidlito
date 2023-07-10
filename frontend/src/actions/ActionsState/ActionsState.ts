import { action } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { Highlight, Store } from 'skandha-facets';
import { Settings } from './Settings';
import { registerActionsCtr } from '/src/actions/ActionsState/registerActionsCtr';
import { ActionT } from '/src/api/types/ActionT';
import {
  IPagination,
  Pagination,
} from '/src/playlists/PlaylistsState/facets/Pagination';

export type PropsT = {
  getActions: () => ActionT[];
  getActionsPagination: () => IPagination | undefined;
  undoAction: (actionId: string) => Promise<any>;
};

export class ActionsState {
  props: PropsT;
  settings = new Settings();

  actionsCtr = {
    store: new Store<ActionT>(),
    highlight: new Highlight<ActionT>(),
    pagination: new Pagination(),
  };

  getSummary() {
    return {
      actions: Skandha.getCtrState(this.actionsCtr),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  @action undoAction(action: ActionT) {
    return this.props.undoAction(action.id);
  }

  constructor(props: PropsT) {
    this.props = props;
    registerActionsCtr(this);
  }
}
