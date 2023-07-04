export type SearchResultT = {
  id: string;
  playlistSlug: string;
  playlistName: string;
  clipSlug: string;
  clipName: string;
  ownerUsername: string;
  nrOfClips: number;
};

export type SearchResultByIdT = { [id: string]: SearchResultT };
