import { stub } from 'react-default-props-context';
import { Deletion } from 'skandha-facets/Deletion';
import { DragAndDrop } from 'skandha-facets/DragAndDrop';
import { Filtering } from 'skandha-facets/Filtering';
import { Highlight } from 'skandha-facets/Highlight';
import { Insertion } from 'skandha-facets/Insertion';
import { Selection } from 'skandha-facets/Selection';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
export { stub, withDefaultProps } from 'react-default-props-context';

const dpsClips = {
  clips: {
    clips: stub as ClipT[],
  },
  clip: {
    clip: stub as ClipT,
  },
  clipsDeletion: {
    clipsDeletion: stub as Deletion,
  },
  clipsDragAndDrop: {
    clipsDragAndDrop: stub as DragAndDrop,
  },
  clipsFiltering: {
    clipsFiltering: stub as Filtering,
  },
  clipsHighlight: {
    clipsHighlight: stub as Highlight,
  },
  clipsInsertion: {
    clipsInsertion: stub as Insertion,
  },
  clipsSelection: {
    clipsSelection: stub as Selection,
  },
};

const dpsPlaylists = {
  playlists: {
    playlists: stub as PlaylistT[],
  },
  playlist: {
    playlist: stub as PlaylistT,
  },
  playlistsDeletion: {
    playlistsDeletion: stub as Deletion,
  },
  playlistsHighlight: {
    playlistsHighlight: stub as Highlight,
  },
  playlistsSelection: {
    playlistsSelection: stub as Selection,
  },
  savePlaylist: {
    savePlaylist: stub as Function,
  },
};

export const defaultProps = {
  ...dpsClips,
  ...dpsPlaylists,
};
