import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  useDragAndDropUIConnector,
  useSelectionUIConnector,
} from 'skandha-mobx/hooks';
import { isLoading } from 'src/api/ResourceState';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Spinner } from 'src/frames/components';
import { PlaylistListViewItem } from 'src/playlists/components/PlaylistListViewItem';
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
  ...dps.dashboardState,
};

export const PlaylistListView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const dragAndDropUIConnector = useDragAndDropUIConnector(
      props.playlistsDragAndDrop
    );
    const selectionUIConnector = useSelectionUIConnector(
      props.playlistsSelection,
      {
        itemSelector: '.PlaylistListViewItem',
      }
    );

    const { playlistsHighlight, dashboardState, updateUrl } = props;
    const goToPlaylist = React.useMemo(
      () => (playlist: PlaylistT) => {
        playlistsHighlight.highlightItem(playlist.id);
        dashboardState.setShowClips(true);
        updateUrl && updateUrl(playlist);
      },
      [updateUrl, dashboardState, playlistsHighlight]
    );

    if (isLoading(props.playlists)) {
      return <Spinner />;
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
          goToPlaylist={goToPlaylist}
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
