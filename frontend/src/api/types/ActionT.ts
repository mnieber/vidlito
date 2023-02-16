export type ActionT = {
  data: string;
  id: string;
  playlistId?: string;
  teaser: string;
  type: 'TrashEntries' | 'TrashPlaylist';
};

export type ActionByIdT = { [id: string]: ActionT };
