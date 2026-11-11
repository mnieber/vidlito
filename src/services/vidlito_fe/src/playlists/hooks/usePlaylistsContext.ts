import * as R from 'ramda';
import React from 'react';
import {
  Addition,
  DragAndDrop,
  Edit,
  Highlight,
  Hovering,
  Insertion,
  Selection,
} from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { DeletionWithFlag } from '/src/clips/ClipsState/facets/DeletionWithFlag';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { Following } from '/src/playlists/PlaylistsState/facets/Following';

export const PlaylistsContext = React.createContext<any>(null);

export const usePlaylistsContext = () => {
  const context = React.useContext(PlaylistsContext);
  if (!context) {
    throw new Error(
      'usePlaylistsContext must be used within a PlaylistsContext.Provider'
    );
  }
  return context;
};

export const playlistsCtx = R.mergeAll([
  {
    playlist: [usePlaylistsContext, 'playlist'] as any as PlaylistT,
    playlists: [usePlaylistsContext, 'playlists'] as any as PlaylistT[],
    playlistsState: [
      usePlaylistsContext,
      'playlistsState',
    ] as any as PlaylistsState,
    playlistsAddition: [
      usePlaylistsContext,
      'playlistsAddition',
    ] as any as Addition,
    playlistsDeletion: [
      usePlaylistsContext,
      'playlistsDeletion',
    ] as any as DeletionWithFlag,
    playlistsDragAndDrop: [
      usePlaylistsContext,
      'playlistsDragAndDrop',
    ] as any as DragAndDrop,
    playlistsEdit: [usePlaylistsContext, 'playlistsEdit'] as any as Edit,
    playlistsHighlight: [
      usePlaylistsContext,
      'playlistsHighlight',
    ] as any as Highlight,
    playlistsHovering: [
      usePlaylistsContext,
      'playlistsHovering',
    ] as any as Hovering,
    playlistsInsertion: [
      usePlaylistsContext,
      'playlistsInsertion',
    ] as any as Insertion,
    playlistsSelection: [
      usePlaylistsContext,
      'playlistsSelection',
    ] as any as Selection,
  },
  {
    playlistPdEdit: [usePlaylistsContext, 'playlistPdEdit'] as any as Edit,
    playlistSettingsEdit: [
      usePlaylistsContext,
      'playlistSettingsEdit',
    ] as any as Edit,
    playlistFollowing: [
      usePlaylistsContext,
      'playlistFollowing',
    ] as any as Following,
  },
]);
