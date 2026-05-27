import * as R from 'ramda';
import React from 'react';
import {
  Addition,
  DragAndDrop,
  Edit,
  Hovering,
} from 'skandha-facets';
import { ClipPdT, ClipT } from '/src/api/types';
import { ClipsDeletion } from '/src/clips/ClipsState/facets/ClipsDeletion';
import { ClipsHighlight } from '/src/clips/ClipsState/facets/ClipsHighlight';
import { ClipsInsertion } from '/src/clips/ClipsState/facets/ClipsInsertion';
import { ClipsMove } from '/src/clips/ClipsState/facets/ClipsMove';
import { ClipsSelection } from '/src/clips/ClipsState/facets/ClipsSelection';

export const ClipsContext = React.createContext<any>(null);

export const useClipsContext = () => {
  const context = React.useContext(ClipsContext);
  if (!context) {
    throw new Error(
      'useClipsContext must be used within a ClipsContext.Provider'
    );
  }
  return context;
};

export const clipsCtx = R.mergeAll([
  {
    clips: [useClipsContext, 'clips'] as any as ClipT[],
    clip: [useClipsContext, 'clip'] as any as ClipT,
    clipsAddition: [useClipsContext, 'clipsAddition'] as any as Addition,
    clipsDragAndDrop: [
      useClipsContext,
      'clipsDragAndDrop',
    ] as any as DragAndDrop,
    clipsSelection: [useClipsContext, 'clipsSelection'] as any as ClipsSelection,
    clipsDeletion: [
      useClipsContext,
      'clipsDeletion',
    ] as any as ClipsDeletion,
    clipsHighlight: [useClipsContext, 'clipsHighlight'] as any as ClipsHighlight,
    clipsHovering: [useClipsContext, 'clipsHovering'] as any as Hovering,
    clipsEdit: [useClipsContext, 'clipsEdit'] as any as Edit,
    clipsInsertion: [useClipsContext, 'clipsInsertion'] as any as ClipsInsertion,
    clipsMove: [useClipsContext, 'clipsMove'] as any as ClipsMove,
  },
  {
    clipPd: [useClipsContext, 'clipPd'] as any as ClipPdT,
    clipPdEdit: [useClipsContext, 'clipPdEdit'] as any as Edit,
    clipSettingsEdit: [useClipsContext, 'clipSettingsEdit'] as any as Edit,
  },
]);
