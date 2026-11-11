import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import {
  dragAndDropUIHandlers,
  DragAndDropUIPropsT,
  selectionUIHandlers,
  SelectionUIPropsT,
} from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { Icon } from '/src/frames/components';
import { IconS } from '/src/frames/components/Icon';
import { LviS } from '/src/frames/components/Lvi';
import { L } from '/src/frames/layout';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistListViewItem.scss';

export type PropsT = {
  isHighlighted: boolean;
  dragAndDropUIProps: DragAndDropUIPropsT;
  selectionUIProps: SelectionUIPropsT;
  goToPlaylist: (playlist: PlaylistT) => void;
  className?: any;
};

const ContextProps = {
  playlist: playlistsCtx.playlist,
};

export const PlaylistListViewItem = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      //
      // 🔳 PlaylistListViewItem 🔳
      //
      <div
        className={cn(
          LviS.root(),
          [
            'PlaylistListViewItem',
            {
              'PlaylistListViewItem--selected':
                props.selectionUIProps.isSelected,
              'PlaylistListViewItem--highlighted': props.isHighlighted,
            },
            `PlaylistListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
          ],
          [props.className]
        )}
        {...selectionUIHandlers(props.selectionUIProps)}
        {...dragAndDropUIHandlers(props.dragAndDropUIProps)}
      >
        {
          // 🔳 Icon 🔳
        }
        <div
          className={cn(LviS.IconContainer(), 'IconContainer', [
            L.row.skewer(),
          ])}
          onClick={() => {
            props.goToPlaylist(props.playlist);
          }}
        >
          <Icon
            className={cn(IconS.size.s15(), IconS.color.gray())}
            name="arrowRight"
          />
        </div>
        {
          // 🔳 Title 🔳
        }
        <div className={cn(LviS.Title(), 'PlaylistListViewItem__Title')}>
          <div>{props.playlist.name}</div>
        </div>
      </div>
    );
  }, ContextProps)
);
