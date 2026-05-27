import * as Skandha from 'skandha';
import {
  Addition,
  Display,
  DragAndDrop,
  Edit,
  Highlight,
  Hovering,
  Insertion,
  Selection,
  Store,
} from 'skandha-facets';
import { ClipPdT } from '/src/api/types/ClipPdT';
import { ClipT } from '/src/api/types/ClipT';
import { ObjT } from '/src/utils/types';

// Local imports
import { ClipPdStore } from './facets/ClipPdStore';
import { ClipsDeletion } from './facets/ClipsDeletion';
import { Move } from './facets/Move';
import { registerClipPdCtr } from './registerClipPdCtr';
import { registerClipSettingsCtr } from './registerClipSettingsCtr';
import { registerClipsCtr } from './registerClipsCtr';

export type PropsT = {
  getClips: () => ClipT[];
  getClipPd: () => ClipPdT | undefined;
  moveClipsToTrash: (ids: string[]) => Promise<any>;
  deleteClips: (ids: string[]) => Promise<any>;
  saveClip: (values: ObjT) => Promise<ClipT>;
  saveClipOrdering: (clips: ClipT[]) => Promise<any>;
  saveClipPd: (values: ObjT) => Promise<ClipPdT>;
  moveClipsToPlaylist: (
    clips: ClipT[],
    playlistId: string,
    copy: boolean
  ) => Promise<any>;
};

export class ClipsState {
  props: PropsT;

  clipsCtr = {
    addition: new Addition<ClipT>(),
    deletion: new ClipsDeletion(this),
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

  clipPdCtr = {
    edit: new Edit(),
    store: new ClipPdStore(),
  };

  clipSettingsCtr = {
    edit: new Edit(),
  };

  getSummary() {
    return {
      clips: Skandha.getCtrState(this.clipsCtr),
      clipPd: Skandha.getCtrState(this.clipPdCtr),
      clipSettings: Skandha.getCtrState(this.clipSettingsCtr),
    };
  }

  destroy() {
    Skandha.cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;
    registerClipsCtr(this);
    registerClipPdCtr(this);
    registerClipSettingsCtr(this);
  }
}
