import { input, output } from 'skandha';
import { ActionByIdT, ActionT } from '/src/api/types/ActionT';
import { listToItemById } from '/src/utils/ids';

export class ActionsData {
  static className = () => 'ActionsData';

  @input actions: Array<ActionT> = [];

  @output get actionById(): ActionByIdT {
    return listToItemById(this.actions);
  }
}
