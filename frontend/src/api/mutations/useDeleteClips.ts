import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  clipIds: string[];
};

export const deleteClips = (args: ArgsT) => {
  return doQuery(
    `mutation deleteClips(
      $clipIds: [UUID]!
    ) {
      deleteClips(
        clipIds: $clipIds
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.deleteClips
    );
  });
};

export const useDeleteClips = () => {
  return useMutation({
    mutationKey: ['deleteClips'],
    mutationFn: deleteClips,
  });
};
