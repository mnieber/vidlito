import { observer } from 'mobx-react-lite';
import { Addition, Selection } from 'skandha-facets';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { DashboardState } from '/src/dashboard/DashboardState/DashboardState';
import { Icon } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './NewClipButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
  ...dps.clipsAddition,
  ...dps.clipsSelection,
  ...dps.dashboardState,
  ...dps.userProfile,
  ...dps.isOwner,
};

export const NewClipButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const l = L.ToolButton;
    const enabled = props.isOwner(props.playlist);

    return (
      <button
        className={cn(
          'NewClipButton',
          //
          //
          l.root(),
          !enabled && l.disabled(),
          props.className
        )}
        disabled={!enabled}
        onClick={() => {
          return onClickNewClipButton(props).then((localClip: ClipT) => {
            navToClip(
              props.playlist.owner.username,
              props.playlist.slug,
              localClip.slug
            );
          });
        }}
      >
        <Icon
          className={cn(
            l.icon.root(),
            l.icon.size.normal(),
            !enabled && l.icon.disabled()
          )}
          name="plus"
        />
        Clip
      </button>
    );
  }, DefaultProps)
);

export function onClickNewClipButton(props: {
  dashboardState: DashboardState;
  userProfile: UserProfileT;
  clipsSelection: Selection;
  clipsAddition: Addition;
}) {
  props.dashboardState.storeNavigationPoint();
  props.dashboardState.toggleShowPlaylistView(false);
  return props.clipsAddition
    .add({ values: createClip(props.userProfile, {}) })
    .then((localClip: ClipT) => {
      props.clipsSelection.selectItem({ itemId: localClip.id });
      return localClip;
    });
}
