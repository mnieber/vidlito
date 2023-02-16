import React from 'react';
import { ActionsState } from 'src/actions/ActionsState';

export type PropsT = {};

export const useActionsState = (props: PropsT) => {
  const [actionsState] = React.useState(() => {
    return new ActionsState({});
  });

  React.useEffect(() => () => actionsState.destroy(), [actionsState]);

  return {
    actionsState,
  };
};
