import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  page: number;
  pageSize: number;
  playlistTerms: string;
  clipTerms: string;
};

export const searchContent = (args: ArgsT) => {
  return doQuery(
    `mutation searchContent(
      $page: Int
      $pageSize: Int
      $playlistTerms: String
      $clipTerms: String
    ) {
      searchContent(
        page: $page
        pageSize: $pageSize
        playlistTerms: $playlistTerms
        clipTerms: $clipTerms
      ) {
        errors
        success
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
        }
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.searchContent);
  });
};

export const useSearchContent = () => {
  return useMutation({
    mutationKey: ['searchContent'],
    mutationFn: searchContent,
  });
};
