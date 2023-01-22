export type ClipT = {
  description?: string;
  endTimeMs?: number;
  id: string;
  name: string;
  slug: string;
  startTimeMs?: number;
  url?: string;
};

export type ClipByIdT = { [id: string]: ClipT };

export type ClipFormT = {
  description?: string;
  name: string;
  slug?: string;
  url?: string;
  startTimeMs?: number;
  endTimeMs?: number;
  id: string;
};
