import { reaction } from 'mobx';
import React from 'react';

export type PropsT<ArgsT> = {
  getInputs: () => ArgsT;
  updateCache?: (args: ArgsT) => any;
};

export const useUpdateCacheReaction = <ArgsT>(props: PropsT<ArgsT>) => {
  return React.useEffect(() => {
    const cleanUpReaction = reaction(
      () => props.getInputs(),
      (inputs) => {
        props.updateCache && props.updateCache(inputs);
      },
      { fireImmediately: true }
    );
    return () => {
      cleanUpReaction();
    };
  });
};
