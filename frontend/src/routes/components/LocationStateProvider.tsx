import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { withDefaultProps } from 'src/app/defaultProps';
import { flags } from 'src/app/flags';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { useRouteUfns } from 'src/routes/hooks/useRoutes';
import { LocationState } from 'src/routes/LocationState';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const LocationStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { routeUfns, history } = useRouteUfns();
    const [locationState] = React.useState(
      () => new LocationState({ history, routeUfns })
    );

    useUpdateStateReaction({
      getInputs: () => {
        return {};
      },
      updateState: (inputs) => {
        if (flags.logStateProviders) {
          log('LocationState updated', locationState.getSummary());
        }
      },
      destroyState: () => locationState.destroy(),
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          locationState: () => locationState,
        },
      };

      return result;
    };

    return (
      <NestedDefaultPropsContext value={getDefaultPropsContext()}>
        {props.children}
      </NestedDefaultPropsContext>
    );
  }, DefaultProps)
);
