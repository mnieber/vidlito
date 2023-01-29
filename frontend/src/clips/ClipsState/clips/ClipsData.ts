import { data, input, output } from 'skandha';
import { ClipByIdT, ClipT } from 'src/api/types/ClipT';
import { listToItemById } from 'src/utils/ids';

export class ClipsData {
  static className = () => 'ClipsData';

  @input clips: Array<ClipT> = [];
  @data previousClip?: ClipT;
  @output clipsDisplay: Array<ClipT> = [];

  @output get clipById(): ClipByIdT {
    return listToItemById(this.clipsDisplay);
  }
}
