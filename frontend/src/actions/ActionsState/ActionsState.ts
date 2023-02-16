import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { ActionsData, initActions } from './actions';
import { Settings } from './Settings';

export type PropsT = {};

export class ActionsState {
  actions = {
    data: new ActionsData(),
  };

  settings = new Settings();

  _actionsMapData(props: PropsT) {}

  getSummary() {
    return {
      actions: Skandha.getCtrState(this.actions),
    };
  }

  destroy() {
    cleanUpCtr(this);
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
