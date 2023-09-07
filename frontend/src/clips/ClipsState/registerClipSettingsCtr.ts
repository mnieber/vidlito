import { addCleanUpFunctionToCtr, cleanUpCtr } from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { ClipsState } from '/src/clips/ClipsState';

const mapData = (state: ClipsState) => {};

const setCallbacks = (state: ClipsState) => {
  const ctr = state.clipSettingsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));
};

export const registerClipSettingsCtr = (state: ClipsState) => {
  registerCtr({
    ctr: state.clipSettingsCtr,
    options: { name: 'ClipsState.ClipSettings' },
    initCtr: () => {
      mapData(state);
      setCallbacks(state);
    },
  });
};
