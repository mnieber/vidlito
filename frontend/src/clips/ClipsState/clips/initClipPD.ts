import { setCallbackMap } from 'aspiration';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { EditCbs } from 'skandha-facets';
import { ClipPDT } from '/src/api/types/ClipPDT';
import { ClipsState, PropsT } from '/src/clips/ClipsState';

export const initClipPD = (state: ClipsState, props: PropsT) => {
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
