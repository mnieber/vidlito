import { action } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps, pmap } from 'skandha';
import { Highlight } from 'skandha-facets/Highlight';
import { registerCtr } from 'skandha-mobx';
import { ActionT } from 'src/api/types/ActionT';
import { ActionsData, initActions } from './actions';
import { Settings } from './Settings';

export type PropsT = {};

export class ActionsState {
  settings = new Settings();

  actions = {
    data: new ActionsData(),
    highlight: new Highlight<ActionT>(),
  };

  _actionsMapData(props: PropsT) {
    const getActionById = (x: string | undefined) =>
      x ? this.actions.data.actionById[x] : undefined;

    mapDataToProps(
      pmap(
        //
        [this.actions.highlight, 'item'],
        () => getActionById(this.actions.highlight.id)
      )
    );
  }

  getSummary() {
    return {
      actions: Skandha.getCtrState(this.actions),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  @action undoAction(action: ActionT) {
    // TODO
  }

  constructor(props: PropsT) {
    registerCtr({
      ctr: this.actions,
      options: { name: 'ActionsState.Actions' },
      initCtr: () => {
        initActions(this, props);
        this._actionsMapData(props);
      },
    });
  }
}
