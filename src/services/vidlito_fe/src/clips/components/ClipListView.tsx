import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { useNavContext } from 'react-nav-handler';
import { withContextProps } from 'react-props-from-context';
import {
  DragAndDropUIConnector,
  Selection,
  SelectionUIConnector,
} from 'skandha-facets';
import { ClipT } from '/src/api/types/ClipT';
import { ClipListViewKeyHandler } from '/src/clips/components';
import { ClipListViewItem } from '/src/clips/components/ClipListViewItem';
import {
  ClipsContext,
  clipsCtx,
  useClipsContext,
} from '/src/clips/hooks/useClipsContext';
import { toClip } from '/src/clips/navFunctions';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { isOnActionsPage } from '/src/dashboard/navFunctions';
import { LoaderBar } from '/src/frames/components/LoaderBar';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';
import { cloneAndExtendContext } from '/src/utils/cloneAndExtendContext';

// Import styles
import './ClipListView.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  playlist: playlistsCtx.playlist,
  clipsDragAndDrop: clipsCtx.clipsDragAndDrop,
  clipsHighlight: clipsCtx.clipsHighlight,
  clipsHovering: clipsCtx.clipsHovering,
  clipsSelection: clipsCtx.clipsSelection,
  clips: clipsCtx.clips,
  dashboardState: dashboardCtx.dashboardState,
};

export const ClipListView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    //
    // 🔳  Handle loading state 🔳
    //
    const navContext = useNavContext('ClipListView');
    const clipsContext = useClipsContext();

    if (isLoading(props.clips)) {
      return <ClipListViewLoader {...props} />;
    }

    const dragAndDropUIConnector = new DragAndDropUIConnector({
      dragAndDrop: props.clipsDragAndDrop,
      hovering: props.clipsHovering,
    });

    const selectionUIConnector = new SelectionUIConnector({
      selection: props.clipsSelection as Selection<ClipT>,
      onSelect: (
        args: {
          itemId: string | undefined;
          isShift?: boolean | undefined;
          isCtrl?: boolean | undefined;
        },
        mouseEvent: any
      ) => {
        if (!args.isShift && !args.isCtrl) {
          const clip = props.clips.find((x) => x.id === args.itemId);
          if (clip) {
            // If the user did not use the right mouse button while
            // on the actions page...
            if (!(isOnActionsPage() && mouseEvent.button === 2)) {
              navContext.nav(toClip)(
                props.playlist.ownerUsername,
                props.playlist.slug,
                clip.slug
              );
            }
          }
        }
      },
    });

    //
    // 🔳 clipDivs 🔳
    //
    const clipDivs = props.clips.map((clip) => {
      return (
        <ClipsContext.Provider
          key={`item-${clip.id}`}
          value={cloneAndExtendContext(clipsContext, { clip: clip })}
        >
          <ClipListViewItem
            showSelectionBg={props.clipsSelection.itemIds.length > 1}
            isHighlighted={clip && props.clipsHighlight.itemId === clip.id}
            selectionUIProps={selectionUIConnector.handle(clip.id)}
            dragAndDropUIProps={dragAndDropUIConnector.handle(clip.id)}
            onContextMenu={(e: any) => {
              e.preventDefault();
              props.dashboardState.clipListContextMenu.openAtPoint({
                x: e.clientX,
                y: e.clientY,
              });
            }}
          />
        </ClipsContext.Provider>
      );
    });

    const noItems = (
      <h2 className="ClipListView__NoItems">There are no clips yet</h2>
    );

    //
    // 🔳 ClipListView 🔳
    //
    return (
      <ClipListViewKeyHandler className={cn(props.className)}>
        <div className={cn('ClipListView')} tabIndex={0}>
          {clipDivs.length > 0 && clipDivs}
          {clipDivs.length === 0 && noItems}
        </div>
      </ClipListViewKeyHandler>
    );
  }, ContextProps)
);

export const ClipListViewLoader = (props: { className?: any }) => {
  const loaderBars = [1, 2, 3, 4, 5].map((id) => {
    return <LoaderBar key={`item-${id}`} className={cn('py-1 h-2 my-4')} />;
  });

  return (
    <div className={cn('ClipListViewLoader', props.className)}>
      {loaderBars}
    </div>
  );
};
