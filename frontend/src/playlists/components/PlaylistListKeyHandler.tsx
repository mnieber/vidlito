import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { createSelectionKeyHandlers } from 'skandha-facets';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { createKeyDownHandler } from '/src/utils';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.playlistsSelection,
  ...dps.playlistsHighlight,
};

export const PlaylistListKeyHandler = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const keyHandlers = {
      ...createSelectionKeyHandlers(props.playlistsSelection),
      'enter': () => {
        props.playlistsHighlight.highlightItem({id: props.playlistsSelection.anchorId})
      }
    };

    const handledKeys = R.keys(keyHandlers);
    const onKeyDown = createKeyDownHandler(keyHandlers);

    return (
      <KeyboardEventHandler handleKeys={handledKeys} onKeyEvent={onKeyDown}>
        {props.children}
      </KeyboardEventHandler>
    );
  }, DefaultProps)
);
