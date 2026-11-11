import { addCleanUpFunctionToCtr, cleanUpCtr } from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { ClipsState } from '/src/clips/ClipsState';

const mapData = (state: ClipsState) => {};

export const registerClipSettingsCtr = (state: ClipsState) => {
  registerCtr({
    ctr: state.clipSettingsCtr,
    options: { name: 'ClipsState.ClipSettings' },
    initCtr: () => {
      mapData(state);
      addCleanUpFunctionToCtr(state, () => cleanUpCtr(state.clipSettingsCtr));
    },
  });
};
