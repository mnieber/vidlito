import { useObservableMutation } from '/src/api/ObservableMutation';
import { doQuery } from '/src/api/graphqlClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  folderIds: string[];
};

export const deleteFolders = (args: ArgsT) => {
  return doQuery(
    `mutation deleteFolders(
      $folderIds: [UUID]!
    ) {
      deleteFolders(
        folderIds: $folderIds
      ) {
        // MOONLEAP TODO
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.deleteFolders);
  });
};

export const useDeleteFolders = () => {
  return useObservableMutation({
    mutationFn: deleteFolders,
  });
};
