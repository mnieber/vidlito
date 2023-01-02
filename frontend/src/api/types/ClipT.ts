export type ClipT = {
  description?: string;
  id: string;
  name: string;
  slug: string;
};

export type ClipByIdT = { [id: string]: ClipT };

export type ClipFormT = {
  description?: string;
  name: string;
  slug?: string;
  id: string;
};
