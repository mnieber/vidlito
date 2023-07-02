export type SearchResultT = {
  id: string;
  playlistSlug: string;
  clipSlug: string;
  ownerUsername: string;
  nrOfClips: number;
};

export type SearchResultByIdT = { [id: string]: SearchResultT };
