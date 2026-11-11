import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { withContextProps } from 'react-props-from-context';
import { createHighlightKeyHandlers } from 'skandha-facets';
import { searchCtx } from '/src/search/hooks/useSearchContext';
import { createKeyDownHandler } from '/src/utils';
import { cn } from '/src/utils/classnames';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

const ContextProps = {
  searchResultsHighlight: searchCtx.searchResultsHighlight,
};

export const SearchResultListKeyHandler = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const keyHandlers = {
      ...createHighlightKeyHandlers(props.searchResultsHighlight),
      'shift+up': () => {},
      'shift+down': () => {},
    };

    const handledKeys = R.keys(keyHandlers);
    const onKeyDown = createKeyDownHandler(keyHandlers);

    return (
      <KeyboardEventHandler
        handleKeys={handledKeys}
        onKeyEvent={onKeyDown}
        className={cn('SearchResultListKeyHandler', props.className)}
      >
        {props.children}
      </KeyboardEventHandler>
    );
  }, ContextProps)
);
