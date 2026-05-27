import { operation } from 'skandha';
import { ActionT } from '/src/api/types/ActionT';
import { ActionsState } from '/src/actions/ActionsState/ActionsState';

export class Undo {
  static className = () => 'Undo';

  constructor(private state: ActionsState) {}

  @operation undo(args: { action: ActionT }) {
    return this.state.props.undoAction(args.action);
  }
}
