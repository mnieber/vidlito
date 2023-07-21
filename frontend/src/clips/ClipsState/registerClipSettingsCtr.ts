import { registerCtr } from 'skandha-mobx';
import { ClipsState } from '/src/clips/ClipsState';

const mapData = (state: ClipsState) => {};

const setCallbacks = (state: ClipsState) => {};

export const registerClipSettingsCtr = (state: ClipsState) => {
  registerCtr({
    ctr: state.settingsCtr,
    options: { name: 'ClipsState.ClipSettings' },
    initCtr: () => {
      setCallbacks(state);
      mapData(state);
    },
  });
};
