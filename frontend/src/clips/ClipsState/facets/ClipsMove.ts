import * as R from 'ramda';
import { operation } from 'skandha';
import { correctHighlight } from 'skandha-facets/policies';
import { ClipsState } from '/src/clips/ClipsState';
import { unselectIds } from '../registerClipsCtr';
import { ObjT } from '/src/utils/types';

export class ClipsMove {
  static className = () => 'ClipsMove';

  constructor(private state: ClipsState) {}

  @operation move(args: { playlistId: string; copy: boolean }) {
    const allIds = [...this.state.clipsCtr.highlight.highlightableIds];
    const clips = [...this.state.clipsCtr.selection.items];
    const clipIds = [...this.state.clipsCtr.selection.itemIds];

    return this.state.props
      .moveClipsToPlaylist(clips, args.playlistId, args.copy)
      .then((response: ObjT) => {
        unselectIds(this.state.clipsCtr.selection, clipIds);
        correctHighlight(
          this.state.clipsCtr.highlight,
          allIds,
          R.without(clipIds, allIds)
        );
        return response;
      });
  }
}
