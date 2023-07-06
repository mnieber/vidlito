import { data, operation } from 'skandha';
import { ClipPDT } from '/src/api/types/ClipPDT';

export class ClipPDStore {
  static className = () => 'ClipPDStore';

  @data clipPD?: ClipPDT;

  @operation setClipPD(clipPD: ClipPDT) {
    this.clipPD = clipPD;
  }
}
