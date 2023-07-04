import { QueryDataT } from '/src/api/ObservableQuery';
import { useGetActions } from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import { graftResourceStates } from '/src/resourceStates/graftResourceStates';

export type ArgsT = {
  playlistId: string | undefined;
  page: number;
};

export const useGetActionsObservableQuery = (args: ArgsT) => {
  return useObservableQuery(
    useGetActions({
      playlistId: args.playlistId,
      page: args.page,
      pageSize: 10,
    }),
    {
      processQueryData: (data: QueryDataT, prevData: QueryDataT) => {
        graftResourceStates({
          resources: data?.actionSet ?? [],
          prevResources: prevData?.actionSet ?? [],
        });
        return data;
      },
    }
  );
};
