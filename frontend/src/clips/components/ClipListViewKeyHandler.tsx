import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { withContextProps } from 'react-props-from-context';
import { createSelectionKeyHandlers } from 'skandha-facets';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { createKeyDownHandler } from '/src/utils';
import { cn } from '/src/utils/classnames';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

const ContextProps = {
  clipsSelection: clipsCtx.clipsSelection,
};

export const ClipListViewKeyHandler = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const keyHandlers = {
      ...createSelectionKeyHandlers(props.clipsSelection),
    };
    const handledKeys = R.keys(keyHandlers);
    const onKeyDown = createKeyDownHandler(keyHandlers);

    return (
      <KeyboardEventHandler
        handleKeys={handledKeys}
        onKeyEvent={onKeyDown}
        className={cn('ClipListViewKeyHandler', [props.className])}
      >
        {props.children}
      </KeyboardEventHandler>
    );
  }, ContextProps)
);
