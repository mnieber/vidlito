import { setCallbackMap } from 'aspiration';
import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
import { EditCbs } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { ClipsState } from '/src/clips/ClipsState';

const mapData = (state: ClipsState) => {
  const ctr = state.clipPdCtr;

  mapDataToProps(ctr, {
    store: {
      clipPd: () => state.props.getClipPd(),
    },
  });
};

const setCallbacks = (state: ClipsState) => {
  const ctr = state.clipPdCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return state.props.saveClipPd(this.args.values);
      },
    },
    cancel: {},
  } as EditCbs);
};

export const registerClipPdCtr = (state: ClipsState) => {
  registerCtr({
    ctr: state.clipPdCtr,
    options: { name: 'ClipsState.ClipPd' },
    initCtr: () => {
      mapData(state);
      setCallbacks(state);
    },
  });
};
