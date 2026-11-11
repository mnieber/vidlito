import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { withContextProps } from 'react-props-from-context';
import { createHighlightKeyHandlers } from 'skandha-facets';
import { actionsCtx } from '/src/actions/hooks/useActionsContext';
import { createKeyDownHandler } from '/src/utils';
import { cn } from '/src/utils/classnames';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

const ContextProps = {
  actionsHighlight: actionsCtx.actionsHighlight,
};

export const ActionListViewKeyHandler = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const keyHandlers = {
      ...createHighlightKeyHandlers(props.actionsHighlight),
      'shift+up': () => {},
      'shift+down': () => {},
    };
    const handledKeys = R.keys(keyHandlers);
    const onKeyDown = createKeyDownHandler(keyHandlers);

    return (
      <KeyboardEventHandler
        handleKeys={handledKeys}
        onKeyEvent={onKeyDown}
        className={cn('ActionListViewKeyHandler', [props.className])}
      >
        {props.children}
      </KeyboardEventHandler>
    );
  }, ContextProps)
);
