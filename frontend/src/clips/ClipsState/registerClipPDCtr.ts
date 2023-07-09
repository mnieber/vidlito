import { setCallbackMap } from 'aspiration';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { mapDataToProps } from 'skandha';
import { EditCbs } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { ClipPDT } from '/src/api/types/ClipPDT';
import { ClipsState, PropsT } from '/src/clips/ClipsState';

const mapData = (state: ClipsState, props: PropsT) => {
  const ctr = state.clipPDCtr;

  mapDataToProps(ctr, {
    store: {
      clipPD: () => props.getClipPD(),
    },
  });
};

const setCallbacks = (state: ClipsState, props: PropsT) => {
  const ctr = state.clipPDCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return props.saveClipPD(this.args.values).then((localClip: ClipPDT) => {
          return localClip;
        });
      },
    },
    cancel: {},
  } as EditCbs);
};

export const registerClipPDCtr = (state: ClipsState, props: PropsT) => {
  registerCtr({
    ctr: state.clipPDCtr,
    options: { name: 'ClipsState.ClipPD' },
    initCtr: () => {
      setCallbacks(state, props);
      mapData(state, props);
    },
  });
};
