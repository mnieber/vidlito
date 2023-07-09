import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import {
  Addition,
  Deletion,
  Display,
  DragAndDrop,
  Edit,
  Highlight,
  Hovering,
  Insertion,
  Selection,
  Store,
} from 'skandha-facets';
import { ClipPDT } from '/src/api/types/ClipPDT';
import { ClipT } from '/src/api/types/ClipT';
import { ClipPDStore } from '/src/clips/ClipsState/facets/ClipPDStore';
import { Move } from '/src/clips/ClipsState/facets/Move';
import { registerClipPDCtr } from '/src/clips/ClipsState/registerClipPDCtr';
import { registerClipsCtr } from '/src/clips/ClipsState/registerClipsCtr';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  getClips: () => ClipT[];
  getClipPD: () => ClipPDT | undefined;
  moveClipsToTrash: (ids: string[]) => Promise<any>;
  saveClip: (values: ObjT) => Promise<ClipT>;
  saveClipPD: (values: ObjT) => Promise<ClipPDT>;
  saveClipOrdering: (clips: ClipT[]) => Promise<any>;
  moveClipsToPlaylist: (
    clips: ClipT[],
    playlistId: string,
    playlistSlug: string,
    copy: boolean
  ) => Promise<any>;
};

export class ClipsState {
  props: PropsT;

  clipsCtr = {
    addition: new Addition<ClipT>(),
    deletion: new Deletion(),
    display: new Display<ClipT>(),
    dragAndDrop: new DragAndDrop(),
    edit: new Edit(),
    highlight: new Highlight<ClipT>(),
    hovering: new Hovering(),
    insertion: new Insertion<ClipT>(),
    move: new Move(),
    selection: new Selection<ClipT>(),
    store: new Store<ClipT>(),
  };

  clipPDCtr = {
    edit: new Edit(),
    store: new ClipPDStore(),
  };

  getSummary() {
    return {
      clips: Skandha.getCtrState(this.clipsCtr),
      clipPD: Skandha.getCtrState(this.clipPDCtr),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;
    registerClipsCtr(this, props);
    registerClipPDCtr(this, props);
  }
}
