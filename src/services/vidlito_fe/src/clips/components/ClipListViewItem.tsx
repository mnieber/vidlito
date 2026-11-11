import { observer } from 'mobx-react-lite';
import { isUpdating } from 'mobx-resource-states';
import { withContextProps } from 'react-props-from-context';
import {
  dragAndDropUIHandlers,
  DragAndDropUIPropsT,
  selectionUIHandlers,
  SelectionUIPropsT,
} from 'skandha-facets';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { LviS } from '/src/frames/components/Lvi';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';
import { PlayVideoIcon } from '/src/videos/components';
import { videoPlayerCtx } from '/src/videos/hooks/useVideoPlayerContext';

// Import styles
import './ClipListViewItem.scss';

export type PropsT = {
  isHighlighted: boolean;
  showSelectionBg: boolean;
  dragAndDropUIProps: DragAndDropUIPropsT;
  selectionUIProps: SelectionUIPropsT;
  onContextMenu?: (e: React.MouseEvent) => void;
  className?: any;
};

const ContextProps = {
  clip: clipsCtx.clip,
  videoPlayerState: videoPlayerCtx.videoPlayerState,
  playlistsDeletion: playlistsCtx.playlistsDeletion,
};

export const ClipListViewItem = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const loading =
      !props.videoPlayerState.videoController.ready && props.isHighlighted;

    const showAsSelected =
      props.selectionUIProps.isSelected && props.showSelectionBg;

    const nrOfPlaylists =
      props.clip.nrOfPublicPlaylists + props.clip.nrOfPrivatePlaylists;
    const clipNamePostfix =
      props.playlistsDeletion.isDeleteEnabled && nrOfPlaylists === 1
        ? ' •'
        : '';

    return (
      /*
      🔳 ClipListViewItem 🔳
      */
      <div
        className={cn(
          LviS.root(),
          [
            'ClipListViewItem',
            {
              'ClipListViewItem--selected': showAsSelected,
              'text-gray-text': !(showAsSelected || props.isHighlighted),
              'ClipListViewItem--highlighted': props.isHighlighted,
            },
            `ClipListViewItem--drag-${props.dragAndDropUIProps.dragState}`,
            { 'animate-delete': isUpdating(props.clip) },
          ],
          [props.className]
        )}
        {...selectionUIHandlers(props.selectionUIProps)}
        {...dragAndDropUIHandlers(props.dragAndDropUIProps)}
        onContextMenu={props.onContextMenu}
      >
        {
          // 🔳 PlayVideoIcon 🔳
        }
        <PlayVideoIcon
          className={cn(LviS.IconContainer())}
          videoController={props.videoPlayerState.videoController}
          visible={
            props.videoPlayerState.videoController.ready && props.isHighlighted
          }
          loading={loading}
        />
        {
          // 🔳 Title 🔳
        }
        <div className={cn(LviS.Title(), 'ClipListViewItem__Title')}>
          {props.clip.name + clipNamePostfix}
        </div>
      </div>
    );
  }, ContextProps)
);
