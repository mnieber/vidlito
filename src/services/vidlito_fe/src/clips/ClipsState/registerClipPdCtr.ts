import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
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

export const registerClipPdCtr = (state: ClipsState) => {
  registerCtr({
    ctr: state.clipPdCtr,
    options: { name: 'ClipsState.ClipPd' },
    initCtr: () => {
      mapData(state);
      addCleanUpFunctionToCtr(state, () => cleanUpCtr(state.clipPdCtr));
    },
  });
};
