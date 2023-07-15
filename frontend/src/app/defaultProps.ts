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
import { SearchContentArgsT } from '/src/api/mutations';
import { ActionT } from '/src/api/types/ActionT';
import { ClipPdT } from '/src/api/types/ClipPdT';
import { ClipT } from '/src/api/types/ClipT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { ClipsState } from '/src/clips/ClipsState';
import { Move } from '/src/clips/ClipsState/facets/Move';
import { DashboardState } from '/src/dashboard/DashboardState';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { IPagination } from '/src/playlists/PlaylistsState/facets/Pagination';
import { SearchState } from '/src/search/SearchState/SearchState';
import { ObjT } from '/src/utils/types';
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
  searchState: {
    searchState: stub as SearchState,
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
    actionsPagination: stub as IPagination,
  },
  actionsPage: {
    actionsPage: stub as ActionT[],
  },
};

const dpsSearchResults = {
  searchResults: {
    searchResults: stub as SearchResultT[],
  },
  searchResultsPage: {
    searchResultsPage: stub as SearchResultT[],
  },
  searchResult: {
    searchResult: stub as SearchResultT,
  },
  searchResultsHighlight: {
    searchResultsHighlight: stub as Highlight,
  },
  searchResultsPagination: {
    searchResultsPagination: stub as IPagination,
  },
  searchForm: {
    searchForm: stub as SearchContentArgsT,
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

const dpsClipPd = {
  clipPd: {
    clipPd: stub as ClipPdT,
  },
  clipPdEdit: {
    clipPdEdit: stub as Edit,
  },
};

const dpsDashboard = {
  followSet: {
    followSet: stub as PlaylistT[],
  },
  userProfile: {
    userProfile: stub as UserProfileT,
  },
  isOwner: {
    isOwner: stub as (obj: ObjT) => boolean,
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

const dpsPlaylist = {
  playlistPdEdit: {
    playlistPdEdit: stub as Edit,
  },
  playlistSettingsEdit: {
    playlistSettingsEdit: stub as Edit,
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
  ...dpsClipPd,
  ...dpsDashboard,
  ...dpsPlaylists,
  ...dpsPlaylist,
  ...dpsSearchResults,
  ...dpsStates,
  ...dpsVideoPlayer,
};

export const dps = defaultProps;
