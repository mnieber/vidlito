import { data, operation } from 'skandha';
import { ClipPdT } from '/src/api/types/ClipPdT';

export class ClipPdStore {
  static className = () => 'ClipPdStore';

  @data clipPd?: ClipPdT;

  @operation setClipPd(clipPd: ClipPdT) {
    this.clipPd = clipPd;
  }
}
