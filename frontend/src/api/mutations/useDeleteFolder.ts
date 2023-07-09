import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  folderId: string;
};

export const deleteFolder = (args: ArgsT) => {
  return doQuery(
    `mutation deleteFolder(
      $folderId: UUID!
    ) {
      deleteFolder(
        folderId: $folderId
      ) {
        // MOONLEAP TODO
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.deleteFolder);
  });
};

export const useDeleteFolder = () => {
  return useMutation({
    mutationKey: ['deleteFolder'],
    mutationFn: deleteFolder,
  });
};
