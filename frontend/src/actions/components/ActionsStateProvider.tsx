import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { useActionsState } from '/src/actions/hooks/useActionsState';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { updateSources } from '/src/resourceStates';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlist,
  ...dps.playlists,
  ...dps.userProfile,
};

export const ActionsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { actionsState: state, getActions } = useActionsState({
      getPlaylist: () => props.playlist,
      getPlaylists: () => props.playlists,
    });

    const cache = useBuilder(() =>
      makeAutoObservable({
        get actions() {
          return updateSources(
            { resource: state.actionsCtr.store.items },
            ['loading', () => isQueryLoading(getActions), 'getActions'],
            ['updating', () => isQueryUpdating(getActions), 'getActions']
          );
        },
        get action() {
          return state.actionsCtr.highlight.item;
        },
      })
    );

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          actionsState: () => state,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        actions: () => cache.actions,
        action: () => cache.action,
        actionsHighlight: () => state.actionsCtr.highlight,
        actionsPagination: () => state.actionsCtr.pagination,
      };

      return result;
    };

    return (
      <DefaultPropsProvider extend value={getDefaultPropsContext()}>
        {props.children}
      </DefaultPropsProvider>
    );
  }, DefaultProps)
);
