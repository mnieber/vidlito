import { observer } from 'mobx-react-lite';
import {
  useDragAndDropUIConnector,
  useSelectionUIConnector,
} from 'skandha-mobx/hooks';
import { isLoaded } from 'src/api/ResourceState';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import UIkit from 'src/frames/styles/uikit';
import { PlaylistListViewItem } from 'src/playlists/components/PlaylistListViewItem';
import { getUpdateUrlFn } from 'src/routes/utils';
import { cn } from 'src/utils/classnames';
import './PlaylistListView.scss';

export type PropsT = {
  updateUrl?: (playlist: PlaylistT) => void;
  className?: any;
};

const DefaultProps = {
  ...dps.playlists,
  ...dps.playlistsDragAndDrop,
  ...dps.playlistsHighlight,
  ...dps.playlistsSelection,
};

export const PlaylistListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const dragAndDropUIConnector = useDragAndDropUIConnector(
      props.playlistsDragAndDrop
    );
    const selectionUIConnector = useSelectionUIConnector(
      props.playlistsSelection,
      {
        onSelectItem: getUpdateUrlFn(props.playlists, props.updateUrl),
      },
      [props.playlists, props.updateUrl]
    );

    if (!isLoaded(props.playlists)) {
      return UIkit && <div data-uk-spinner className="" />;
    } else if (!props.playlists?.length) return null;

    const noItems = <h2>There are no playlists</h2>;

    const playlistDivs = props.playlists.map((playlist) => {
      return (
        <PlaylistListViewItem
          key={playlist.id}
          playlist={playlist}
          isHighlighted={
            playlist && props.playlistsHighlight.id === playlist.id
          }
          selectionUIProps={selectionUIConnector.handle(playlist.id)}
          dragAndDropUIProps={dragAndDropUIConnector.handle(playlist.id)}
        />
      );
    });

    return (
      <div className={cn('PlaylistListView', props.className)}>
        {playlistDivs.length > 0 && playlistDivs}
        {playlistDivs.length === 0 && noItems}
      </div>
    );
  }, DefaultProps)
);
