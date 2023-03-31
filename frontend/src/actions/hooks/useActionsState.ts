import React from 'react';
import { ActionsState } from 'src/actions/ActionsState';
import { useUndoAction } from 'src/api/mutations/useUndoAction';

export type PropsT = {};

export const useActionsState = (props: PropsT) => {
  const undoAction = useUndoAction();

  const [actionsState] = React.useState(() => {
    return new ActionsState({
      undoAction: (actionId: string) => undoAction.mutateAsync({ actionId }),
    });
  });

  React.useEffect(() => () => actionsState.destroy(), [actionsState]);

  return {
    actionsState,
  };
};
