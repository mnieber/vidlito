import * as Skandha from 'skandha';
import {
  Display,
  DragAndDrop,
  Edit,
  Hovering,
  Store,
} from 'skandha-facets';
import { ClipPdT } from '/src/api/types/ClipPdT';
import { ClipT } from '/src/api/types/ClipT';
import { ObjT } from '/src/utils/types';

// Local imports
import { ClipPdEdit } from './facets/ClipPdEdit';
import { ClipPdStore } from './facets/ClipPdStore';
import { ClipsAddition } from './facets/ClipsAddition';
import { ClipsDeletion } from './facets/ClipsDeletion';
import { ClipsEdit } from './facets/ClipsEdit';
import { ClipsHighlight } from './facets/ClipsHighlight';
import { ClipsInsertion } from './facets/ClipsInsertion';
import { ClipsMove } from './facets/ClipsMove';
import { ClipsSelection } from './facets/ClipsSelection';
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
    addition: new ClipsAddition(this),
    deletion: new ClipsDeletion(this),
    display: new Display<ClipT>(),
    dragAndDrop: new DragAndDrop(),
    edit: new ClipsEdit(this),
    highlight: new ClipsHighlight(this),
    hovering: new Hovering(),
    insertion: new ClipsInsertion(this),
    move: new ClipsMove(this),
    selection: new ClipsSelection(this),
    store: new Store<ClipT>(),
  };

  clipPdCtr = {
    edit: new ClipPdEdit(this),
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
