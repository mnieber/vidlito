import React from 'react';
import { Highlight } from 'skandha-facets';
import { ActionsState } from '/src/actions/ActionsState';
import { Undo } from '/src/actions/ActionsState/facets/Undo';
import { IPagination } from '/src/api/pagination/types';
import { ActionT } from '/src/api/types/ActionT';

export const ActionsContext = React.createContext<any>(null);

export const useActionsContext = () => {
  const context = React.useContext(ActionsContext);
  if (!context) {
    throw new Error(
      'useActionsContext must be used within a ActionsContext.Provider'
    );
  }
  return context;
};

export const actionsCtx = {
  action: [useActionsContext, 'action'] as any as ActionT,
  actions: [useActionsContext, 'actions'] as any as ActionT[],
  actionsHighlight: [useActionsContext, 'actionsHighlight'] as any as Highlight,
  actionsUndo: [useActionsContext, 'actionsUndo'] as any as Undo,
  actionsState: [useActionsContext, 'actionsState'] as any as ActionsState,
  actionsPagination: [
    useActionsContext,
    'actionsPagination',
  ] as any as IPagination,
};
