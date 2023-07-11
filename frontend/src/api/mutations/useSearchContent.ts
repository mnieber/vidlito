import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  page: number;
  pageSize: number;
  playlistTerms: string[];
  playlistTags: string[];
  clipTerms: string[];
  clipTags: string[];
};

export const searchContent = (args: ArgsT) => {
  return doQuery(
    `mutation searchContent(
      $page: Int
      $pageSize: Int
      $playlistTerms: [String]
      $playlistTags: [String]
      $clipTerms: [String]
      $clipTags: [String]
    ) {
      searchContent(
        page: $page
        pageSize: $pageSize
        playlistTerms: $playlistTerms
        playlistTags: $playlistTags
        clipTerms: $clipTerms
        clipTags: $clipTags
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
