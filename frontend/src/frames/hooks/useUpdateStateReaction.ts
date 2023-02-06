import { reaction } from 'mobx';
import React from 'react';
import { flags } from 'src/app/flags';

export type PropsT<ArgsT> = {
  getInputs: () => ArgsT;
  updateState: (args: ArgsT) => any;
  logState?: (args: ArgsT) => any;
};

export const useUpdateStateReaction = <ArgsT>(props: PropsT<ArgsT>) => {
  return React.useEffect(() => {
    const cleanUpReaction = reaction(
      () => props.getInputs(),
      (inputs) => {
        props.updateState(inputs);
        if (flags.logStateProviders && props.logState) {
          props.logState(inputs);
        }
      },
      { fireImmediately: true }
    );
    return () => {
      cleanUpReaction();
    };
  });
};
