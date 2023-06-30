import { stub, withDefaultProps } from 'react-default-props-context';
import {
  Addition,
  Deletion,
  DragAndDrop,
  Edit,
  Highlight,
  Hovering,
  Insertion,
  Selection,
} from 'skandha-facets';
import { ActionsState } from '/src/actions/ActionsState';
import { ActionT } from '/src/api/types/ActionT';
import { ClipT } from '/src/api/types/ClipT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { ClipsState } from '/src/clips/ClipsState';
import { Move } from '/src/clips/ClipsState/facets/Move';
import { DashboardState } from '/src/dashboard/DashboardState';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { Pagination } from '/src/playlists/PlaylistsState/facets/Pagination';
import { VideoController } from '/src/videos/VideoController';
import { VideoPlayerState } from '/src/videos/VideoPlayerState';
export { stub, withDefaultProps } from 'react-default-props-context';

// This is a workaround for a bug in webpack
!withDefaultProps && (console as any).log(withDefaultProps);

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
  actionsPagination: {
    actionsPagination: stub as Pagination,
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
  clipsHovering: {
    clipsHovering: stub as Hovering,
  },
  clipsEdit: {
    clipsEdit: stub as Edit,
  },
  clipsHighlight: {
    clipsHighlight: stub as Highlight,
  },
  clipsInsertion: {
    clipsInsertion: stub as Insertion,
  },
  clipsMove: {
    clipsMove: stub as Move,
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
  playlistsHovering: {
    playlistsHovering: stub as Hovering,
  },
  playlistsEdit: {
    playlistsEdit: stub as Edit,
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
