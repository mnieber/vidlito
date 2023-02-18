import { stub, withDefaultProps } from 'react-default-props-context';
import { Addition } from 'skandha-facets/Addition';
import { Deletion } from 'skandha-facets/Deletion';
import { DragAndDrop } from 'skandha-facets/DragAndDrop';
import { Editing } from 'skandha-facets/Editing';
import { Highlight } from 'skandha-facets/Highlight';
import { Insertion } from 'skandha-facets/Insertion';
import { Selection } from 'skandha-facets/Selection';
import { ActionsState } from 'src/actions/ActionsState';
import { ActionT } from 'src/api/types/ActionT';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { UserProfileT } from 'src/api/types/UserProfileT';
import { ClipsState } from 'src/clips/ClipsState';
import { DashboardState } from 'src/dashboard/DashboardState';
import { PlaylistsState } from 'src/playlists/PlaylistsState';
import { UrlState } from 'src/routes/UrlState';
import { VideoController } from 'src/videos/VideoController';
import { VideoPlayerState } from 'src/videos/VideoPlayerState';
export { stub, withDefaultProps } from 'react-default-props-context';

// This is a workaround for a bug in webpack
!withDefaultProps && console.log(withDefaultProps);

const dpsStates = {
  actionsState: {
    actionsState: stub as ActionsState,
  },
  clipsState: {
    clipsState: stub as ClipsState,
  },
  dashboardState: {
    dashboardState: stub as DashboardState,
  },
  urlState: {
    urlState: stub as UrlState,
  },
  playlistsState: {
    playlistsState: stub as PlaylistsState,
  },
};

const dpsActions = {
  actions: {
    actions: stub as ActionT[],
  },
  action: {
    action: stub as ActionT,
  },
  actionsHighlight: {
    actionsHighlight: stub as Highlight,
  },
};

const dpsClips = {
  clips: {
    clips: stub as ClipT[],
  },
  clip: {
    clip: stub as ClipT,
  },
  clipsAddition: {
    clipsAddition: stub as Addition,
  },
  clipsDeletion: {
    clipsDeletion: stub as Deletion,
  },
  clipsDragAndDrop: {
    clipsDragAndDrop: stub as DragAndDrop,
  },
  clipsEditing: {
    clipsEditing: stub as Editing,
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

const dpsDashboard = {
  userProfile: {
    userProfile: stub as UserProfileT,
  },
  username: {
    username: stub as string,
  },
  isAuthenticated: {
    isAuthenticated: stub as boolean,
  },
};

const dpsPlaylists = {
  playlists: {
    playlists: stub as PlaylistT[],
  },
  playlist: {
    playlist: stub as PlaylistT,
  },
  playlistsAddition: {
    playlistsAddition: stub as Addition,
  },
  playlistsDeletion: {
    playlistsDeletion: stub as Deletion,
  },
  playlistsDragAndDrop: {
    playlistsDragAndDrop: stub as DragAndDrop,
  },
  playlistsEditing: {
    playlistsEditing: stub as Editing,
  },
  playlistsHighlight: {
    playlistsHighlight: stub as Highlight,
  },
  playlistsInsertion: {
    playlistsInsertion: stub as Insertion,
  },
  playlistsSelection: {
    playlistsSelection: stub as Selection,
  },
};

const dpsVideoPlayer = {
  videoPlayerState: {
    videoPlayerState: stub as VideoPlayerState,
  },
  videoController: {
    videoController: stub as VideoController,
  },
};

export const defaultProps = {
  ...dpsActions,
  ...dpsClips,
  ...dpsDashboard,
  ...dpsPlaylists,
  ...dpsStates,
  ...dpsVideoPlayer,
};

export const dps = defaultProps;
