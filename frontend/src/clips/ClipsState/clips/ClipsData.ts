import { data, input, operation, output } from 'skandha';
import { ClipByIdT, ClipT } from 'src/api/types/ClipT';
import { listToItemById } from 'src/utils/ids';

export class ClipsData {
  static className = () => 'ClipsData';

  @input clips: Array<ClipT> = [];
  @output clipsDisplay: Array<ClipT> = [];
  @data playlistId?: string;

  @output get clipById(): ClipByIdT {
    return listToItemById(this.clipsDisplay);
  }

  @operation setPlaylistId(id: string) {
    this.playlistId = id;
  }
}
