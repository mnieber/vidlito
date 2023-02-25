import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps, pmap } from 'skandha';
import { Addition } from 'skandha-facets/Addition';
import { Deletion } from 'skandha-facets/Deletion';
import { DragAndDrop } from 'skandha-facets/DragAndDrop';
import { Editing } from 'skandha-facets/Editing';
import { Highlight } from 'skandha-facets/Highlight';
import { Insertion } from 'skandha-facets/Insertion';
import * as FacetPolicies from 'skandha-facets/policies';
import { Selection } from 'skandha-facets/Selection';
import { registerCtr } from 'skandha-mobx';
import { ClipT } from 'src/api/types/ClipT';
import { getIds } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';
import { ClipsData, initClips } from './clips';

export type PropsT = {
  moveClipsToTrash: (ids: string[]) => Promise<any>;
  saveClip: (values: ObjT) => Promise<ClipT>;
  saveClipOrdering: (clips: ClipT[]) => Promise<any>;
  moveClipsToPlaylist: (
    clips: ClipT[],
    playlistId: string,
    copy: boolean
  ) => Promise<any>;
};

export class ClipsState {
  props: PropsT;

  clips = {
    data: new ClipsData(),
    addition: new Addition<ClipT>(),
    deletion: new Deletion(),
    dragAndDrop: new DragAndDrop(),
    editing: new Editing(),
    highlight: new Highlight<ClipT>(),
    insertion: new Insertion<ClipT>(),
    selection: new Selection<ClipT>(),
  };

  moveClipsToPlaylist(playlistId: string, copy: boolean = false) {
    const clips = this.clips.selection.items;
    return this.props.moveClipsToPlaylist(clips, playlistId, copy);
  }

  _clipsMapData(props: PropsT) {
    const getClipById = (x: string | undefined) =>
      x ? this.clips.data.clipById[x] : undefined;

    mapDataToProps(
      pmap(
        //
        [this.clips.selection, 'selectableIds'],
        () => getIds(this.clips.data.clipsDisplay)
      ),
      pmap(
        //
        [this.clips.selection, 'items'],
        () => this.clips.selection.ids.map(getClipById as any)
      ),
      pmap(
        //
        [this.clips.highlight, 'item'],
        () => getClipById(this.clips.highlight.id)
      ),
      pmap(
        //
        [this.clips.insertion, 'inputItems'],
        () => this.clips.data.clips
      ),
      pmap(
        //
        [this.clips.insertion, 'preview'],
        () =>
          FacetPolicies.insertionPreviewUsesDragSources(
            [FacetPolicies.DragSourceFromNewItem],
            this.clips
          )(this.clips.insertion.inputItems)
      ),
      pmap(
        //
        [this.clips.data, 'clipsDisplay'],
        () => this.clips.insertion.preview
      )
    );
  }

  getSummary() {
    return {
      clips: Skandha.getCtrState(this.clips),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    this.props = props;

    registerCtr({
      ctr: this.clips,
      options: { name: 'ClipsState.Clips' },
      initCtr: () => {
        initClips(this, props);
        this._clipsMapData(props);
      },
    });
  }
}
