import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  useDragAndDropUIConnector,
  useSelectionUIConnector,
} from 'skandha-mobx/hooks';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Spinner } from 'src/frames/components';
import {
  PlaylistsUrlEventsT,
  useUrlEventHandler,
} from 'src/frames/pages/index';
import { PlaylistListViewItem } from 'src/playlists/components/PlaylistListViewItem';
import { isLoading } from 'src/resourceStates';
import { cn } from 'src/utils/classnames';
import './PlaylistListView.scss';

export type UrlEventsT = PlaylistsUrlEventsT;

export type PropsT = {
  isExpanded: boolean;
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
    const urlEvents = useUrlEventHandler<UrlEventsT>();

    const dragAndDropUIConnector = useDragAndDropUIConnector(
      props.playlistsDragAndDrop
    );
    const selectionUIConnector = useSelectionUIConnector(
      props.playlistsSelection,
      {
        itemSelector: '.PlaylistListViewItem',
      }
    );

    const { playlistsHighlight, dashboardState } = props;
    const goToPlaylist = React.useMemo(
      () => (playlist: PlaylistT) => {
        playlistsHighlight.highlightItem({ id: playlist.id });
        dashboardState.setIsPlaylistListExpanded(false);
        urlEvents.userHighlightsPlaylist(playlist.slug);
      },
      [urlEvents, dashboardState, playlistsHighlight]
    );

    if (isLoading(props.playlists)) {
      return <Spinner />;
    }

    if (!props.isExpanded) {
      return null;
    }

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
