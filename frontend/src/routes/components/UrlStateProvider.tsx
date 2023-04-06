import { observer } from 'mobx-react-lite';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { useUrlState } from 'src/routes/hooks/useUrlState';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.username,
};

export const UrlStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { urlState } = useUrlState({});

    useUpdateStateReaction({
      getInputs: () => ({ username: props.username }),
      updateState: (inputs) => {
        urlState.username = inputs.username;
      },
      logState: () => {
        log('UrlState updated', urlState.getSummary());
      },
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          urlState: () => urlState,
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
