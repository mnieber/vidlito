import { useQuery } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { usePaginationChanged } from '/src/api/pagination/hooks/usePaginationChanged';
import { queryClient } from '/src/api/queryClient';
import { createQueryKey } from '/src/utils/createQueryKey';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  page: number;
  pageSize: number;
  playlistTerms?: string;
  clipTerms?: string;
};

export const searchContent = (args: ArgsT) => {
  return doQuery(
    `query searchContent(
      $page: Int!
      $pageSize: Int!
      $playlistTerms: String
      $clipTerms: String
    ) {
      searchContent(
        page: $page
        pageSize: $pageSize
        clipTerms: $clipTerms
        playlistTerms: $playlistTerms
      ) {
        searchResults {
          id
          playlistSlug
          playlistName
          clipSlug
          clipName
          nrOfClips
          ownerUsername
        }
        pagination {
          nrOfItems
          pageSize
          page
        }
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.searchContent);
  });
};

export type QueryKeyT = ArgsT;

export function queryKey(args: QueryKeyT) {
  return createQueryKey<QueryKeyT>('searchContent', args);
}

export type OptionsT = {
  enabled?: boolean;
};

export const useSearchContent = (args: ArgsT, options?: OptionsT) => {
  const paginationChanged = usePaginationChanged(args);
  if (paginationChanged && queryClient.getQueryData(queryKey(args))) {
    invalidateSearchContent(args);
  }

  return useQuery({
    queryKey: queryKey(args),
    queryFn: () => searchContent(args),
    enabled: !!(options?.enabled ?? true),
  });
};

export const invalidateSearchContent = (args: QueryKeyT) => {
  return queryClient.invalidateQueries({
    queryKey: queryKey(args),
  });
};
