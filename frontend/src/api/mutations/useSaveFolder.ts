import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  folderId: string;
  name: string;
  parentFolderId: string;
};

export const saveFolder = (args: ArgsT) => {
  return doQuery(
    `mutation saveFolder(
      $folderId: UUID!
      $name: String!
      $parentFolderId: UUID!
    ) {
      saveFolder(
        folderId: $folderId
        name: $name
        parentFolderId: $parentFolderId
      ) {
        // MOONLEAP TODO
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.saveFolder);
  });
};

export const useSaveFolder = () => {
  return useMutation({
    mutationKey: ['saveFolder'],
    mutationFn: saveFolder,
  });
};
