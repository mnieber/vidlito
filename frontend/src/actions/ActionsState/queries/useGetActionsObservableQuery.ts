import { ActionsState } from '/src/actions/ActionsState/ActionsState';
import { useGetActions } from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import { useGraftResourceStates } from '/src/utils/hooks/useGraftResourceStates';

export type PropsT = {
  playlist: any;
  actionsState: ActionsState;
};

export const useGetActionsObservableQuery = (props: PropsT) => {
  // Get actions
  const getActions = useObservableQuery(
    useGetActions({
      playlistId: props.actionsState.settings.showAllActions
        ? undefined
        : props.playlist?.id,
      page: props.actionsState.actionsCtr.pagination.page,
      pageSize: 10,
    })
  );

  const getActionsData = () => getActions.data?.actionSet ?? [];
  const getPaginationData = () => getActions.data?.pagination;

  // Graft the action resource states
  useGraftResourceStates(getActionsData());

  return { getActions, getActionsData, getPaginationData };
};
