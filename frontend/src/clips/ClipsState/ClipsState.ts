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
} from 'skandha-facets';
import { ClipPdT } from '/src/api/types/ClipPdT';
import { ClipT } from '/src/api/types/ClipT';
import { ClipPdStore } from '/src/clips/ClipsState/facets/ClipPdStore';
import { ClipsStore } from '/src/clips/ClipsState/facets/ClipsStore';
import { DeletionWithFlag } from '/src/clips/ClipsState/facets/DeletionWithFlag';
import { Move } from '/src/clips/ClipsState/facets/Move';
import { registerClipPdCtr } from '/src/clips/ClipsState/registerClipPdCtr';
import { registerClipSettingsCtr } from '/src/clips/ClipsState/registerClipSettingsCtr';
import { registerClipsCtr } from '/src/clips/ClipsState/registerClipsCtr';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  getClips: () => ClipT[];
  getClipPd: () => ClipPdT | undefined;
  moveClipsToTrash: (ids: string[]) => Promise<any>;
  saveClip: (values: ObjT) => Promise<ClipT>;
  saveClipPd: (values: ObjT) => Promise<ClipPdT>;
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
    deletion: new DeletionWithFlag(),
    display: new Display<ClipT>(),
    dragAndDrop: new DragAndDrop(),
    edit: new Edit(),
    highlight: new Highlight<ClipT>(),
    hovering: new Hovering(),
    insertion: new Insertion<ClipT>(),
    move: new Move(),
    selection: new Selection<ClipT>(),
    store: new ClipsStore(),
  };

  clipPdCtr = {
    edit: new Edit(),
    store: new ClipPdStore(),
  };

  settingsCtr = {
    edit: new Edit(),
  };

  getSummary() {
    return {
      clips: Skandha.getCtrState(this.clipsCtr),
      clipPd: Skandha.getCtrState(this.clipPdCtr),
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
