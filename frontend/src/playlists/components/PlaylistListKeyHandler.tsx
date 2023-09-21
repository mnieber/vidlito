import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { createSelectionKeyHandlers } from 'skandha-facets';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { createKeyDownHandler } from '/src/utils';
import { cn } from '/src/utils/classnames';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

const DefaultProps = {
  ...dps.playlistsSelection,
  ...dps.playlistsHighlight,
};

export const PlaylistListKeyHandler = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const keyHandlers = {
      ...createSelectionKeyHandlers(props.playlistsSelection),
      enter: () => {
        props.playlistsHighlight.set({
          itemId: props.playlistsSelection.anchorId,
        });
      },
    };

    const handledKeys = R.keys(keyHandlers);
    const onKeyDown = createKeyDownHandler(keyHandlers);

    return (
      <KeyboardEventHandler
        handleKeys={handledKeys}
        onKeyEvent={onKeyDown}
        className={cn('PlaylistListKeyHandler', props.className)}
      >
        {props.children}
      </KeyboardEventHandler>
    );
  }, DefaultProps)
);
