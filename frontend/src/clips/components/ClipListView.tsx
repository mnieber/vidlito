import { ControlledMenu, MenuItem, useMenuState } from '@szhsin/react-menu';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  useDragAndDropUIConnector,
  useSelectionUIConnector,
} from 'skandha-mobx/hooks';
import { isLoaded } from 'src/api/ResourceState';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipListViewItem } from 'src/clips/components/ClipListViewItem';
import { Icon } from 'src/frames/components';
import UIkit from 'src/frames/styles/uikit';
import { createOnSelectItemHandler } from 'src/routes/utils';
import { cn } from 'src/utils/classnames';
import './ClipListView.scss';

export type PropsT = {
  updateUrl?: (clip: ClipT) => void;
  className?: any;
};

const DefaultProps = {
  ...dps.clips,
  ...dps.clipsDragAndDrop,
  ...dps.clipsHighlight,
  ...dps.clipsSelection,
};

export const ClipListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const [anchorPoint, setAnchorPoint] = React.useState({ x: 0, y: 0 });
    const [menuProps, toggleMenu] = useMenuState();

    const dragAndDropUIConnector = useDragAndDropUIConnector(
      props.clipsDragAndDrop
    );
    const selectionUIConnector = useSelectionUIConnector(
      props.clipsSelection,
      {
        onSelectItem: createOnSelectItemHandler(props.clips, props.updateUrl),
        itemSelector: '.ClipListViewItem',
      },
      [props.clips, props.updateUrl]
    );

    if (!isLoaded(props.clips)) {
      return UIkit && <div data-uk-spinner className="" />;
    } else if (!props.clips?.length) return null;

    const noItems = <h2>There are no clips</h2>;

    const menuDiv = (
      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
        direction="right"
        onClose={() => toggleMenu(false)}
      >
        <MenuItem>
          <Icon name="trash" />
          Move to Trash
        </MenuItem>
      </ControlledMenu>
    );

    const clipDivs = props.clips.map((clip, idx) => {
      const isHighlighted = clip && props.clipsHighlight.id === clip.id;

      return (
        <ClipListViewItem
          key={clip.id}
          clip={clip}
          isHighlighted={isHighlighted}
          selectionUIProps={selectionUIConnector.handle(clip.id)}
          dragAndDropUIProps={dragAndDropUIConnector.handle(clip.id)}
          onContextMenu={(e) => {
            e.preventDefault();
            setAnchorPoint({ x: e.clientX, y: e.clientY });
            toggleMenu(true);
          }}
        />
      );
    });

    return (
      <div className={cn('ClipListView', props.className)}>
        {menuDiv}
        {clipDivs.length > 0 && clipDivs}
        {clipDivs.length === 0 && noItems}
      </div>
    );
  }, DefaultProps)
);
