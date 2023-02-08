import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { useLocationState } from 'src/routes/hooks/useLocationState';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const LocationStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { locationState } = useLocationState({});

    useUpdateStateReaction({
      getInputs: () => ({}),
      updateState: (inputs) => {},
      logState: () => {
        log('LocationState updated', locationState.getSummary());
      },
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
