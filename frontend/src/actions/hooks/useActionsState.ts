import { action } from 'mobx';
import React from 'react';
import { ActionsState } from 'src/actions/ActionsState';
import { useUndoAction } from 'src/api/mutations/useUndoAction';
import { setToReady, setToUpdating } from 'src/api/ResourceState';

export type PropsT = {};

export const useActionsState = (props: PropsT) => {
  const undoAction = useUndoAction();

  const [actionsState] = React.useState(() => {
    return new ActionsState({
      undoAction: action((actionId: string) => {
        const action = actionsState.actionsCtr.data.actionById[actionId];
        action && setToUpdating(action);
        const result = undoAction.mutateAsync({ actionId });
        return result.then(() => {
          setToReady(action);
        });
      }),
    });
  });

  React.useEffect(() => () => actionsState.destroy(), [actionsState]);

  return {
    actionsState,
    undoAction,
  };
};
