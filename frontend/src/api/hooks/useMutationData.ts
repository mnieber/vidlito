import { runInAction } from 'mobx';
import React from 'react';
import { MutationData } from 'src/api/MutationData';
import { ObjT } from 'src/utils/types';

export type OptionsT = {
  fetchAsLoad?: boolean;
};

export const useMutationData = (mutation: ObjT, options?: OptionsT) => {
  const [mutationData] = React.useState(() => new MutationData());

  React.useEffect(() => {
    runInAction(() => {
      mutationData.mutation = mutation;
      mutationData.mutateAsync = mutation.mutateAsync;
      mutationData.status = mutation.status;
    });
  }, [mutation, mutationData]);

  return mutationData;
};
