import { action } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps } from 'skandha';
import { Highlight } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { Settings } from './Settings';
import { ActionsData, initActions } from './actions';
import { ActionT } from '/src/api/types/ActionT';
import { getIds } from '/src/utils/ids';

export type PropsT = {
  undoAction: (actionId: string) => Promise<any>;
};

export class ActionsState {
  props: PropsT;
  settings = new Settings();

  actionsCtr = {
    data: new ActionsData(),
    highlight: new Highlight<ActionT>(),
  };

  _actionsMapData(props: PropsT) {
    const ctr = this.actionsCtr;

    const getActionById = (x: string | undefined) =>
      x ? ctr.data.actionById[x] : undefined;

    mapDataToProps(ctr, {
      highlight: {
        item: () => getActionById(ctr.highlight.id),
        highlightableIds: () => getIds(ctr.data.actions),
      },
    });
  }

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

    registerCtr({
      ctr: this.actionsCtr,
      options: { name: 'ActionsState.Actions' },
      initCtr: () => {
        initActions(this, props);
        this._actionsMapData(props);
      },
    });
  }
}
