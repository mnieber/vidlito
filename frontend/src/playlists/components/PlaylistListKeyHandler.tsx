import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { withContextProps } from 'react-props-from-context';
import { createSelectionKeyHandlers } from 'skandha-facets';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { createKeyDownHandler } from '/src/utils';
import { cn } from '/src/utils/classnames';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

const ContextProps = {
  playlistsSelection: playlistsCtx.playlistsSelection,
  playlistsHighlight: playlistsCtx.playlistsHighlight,
};

export const PlaylistListKeyHandler = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
  }, ContextProps)
);
