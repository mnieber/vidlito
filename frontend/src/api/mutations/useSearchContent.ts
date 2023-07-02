import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistTerms: string[];
  playlistTags: string[];
  clipTerms: string[];
  clipTags: string[];
};

export const searchContent = (args: ArgsT) => {
  return doQuery(
    `mutation searchContent(
      $playlistTerms: [String]
      $playlistTags: [String]
      $clipTerms: [String]
      $clipTags: [String]
    ) {
      searchContent(
        playlistTerms: $playlistTerms
        playlistTags: $playlistTags
        clipTerms: $clipTerms
        clipTags: $clipTags
      ) {
        errors
        success
        searchResults {
          playlistSlug
          clipSlug
          nrOfClips
          ownerUsername
        }
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(
      import.meta.env.DEV ? 1000 : 0,
      response.searchContent.searchResults
    );
  });
};

export const useSearchContent = () => {
  return useMutation({
    mutationKey: ['searchContent'],
    mutationFn: searchContent,
  });
};
