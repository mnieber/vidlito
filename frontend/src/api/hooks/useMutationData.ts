import { runInAction } from 'mobx';
import React from 'react';
import { MutationData } from 'src/api/MutationData';
import { flags } from 'src/app/flags';
import { log } from 'src/utils/logging';
import { ObjT } from 'src/utils/types';

export type OptionsT = {
  fetchAsLoad?: boolean;
  debugLabel?: string;
};

export const useMutationData = (mutation: ObjT, options?: OptionsT) => {
  const debugLabel = options?.debugLabel;

  const [mutationData] = React.useState(() => {
    const mutationData = new MutationData();
    mutationData.debugLabel = debugLabel;
    return mutationData;
  });

  React.useEffect(() => {
    runInAction(() => {
      mutationData.mutation = mutation;
      mutationData.mutateAsync = mutation.mutateAsync;
      mutationData.status = mutation.status;
      if (debugLabel && flags.logQueries) {
        log(
          `MutationData ${mutationData.id} (${debugLabel}) updated to ` +
            `${mutationData.status}`
        );
      }
    });
  }, [mutation, mutationData, debugLabel]);

  return mutationData;
};
