import { useGetActions } from '/src/api/endpoints';
import { useQueryData } from '/src/api/hooks';
import { graftResourceStates } from '/src/resourceStates/graftResourceStates';

export type ArgsT = {
  playlistId: string | undefined;
  page: number;
};
export const useGetActionsQueryData = (args: ArgsT) => {
  return useQueryData(
    useGetActions({
      playlistId: args.playlistId,
      page: args.page,
      pageSize: 10,
    }),
    {
      processQueryData: (data, prevData) => {
        graftResourceStates({
          resources: data?.actionSet ?? [],
          prevResources: prevData?.actionSet ?? [],
        });
        return data;
      },
    }
  );
};
