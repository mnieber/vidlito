import { action } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps, pmap } from 'skandha';
import { Highlight } from 'skandha-facets/Highlight';
import { registerCtr } from 'skandha-mobx';
import { ActionT } from 'src/api/types/ActionT';
import { ActionsData, initActions } from './actions';
import { Settings } from './Settings';

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
    const getActionById = (x: string | undefined) =>
      x ? this.actionsCtr.data.actionById[x] : undefined;

    mapDataToProps(
      pmap(
        //
        [this.actionsCtr.highlight, 'item'],
        () => getActionById(this.actionsCtr.highlight.id)
      )
    );
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
