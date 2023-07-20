import { observer } from 'mobx-react-lite';
import { Addition, Selection } from 'skandha-facets';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { DashboardState } from '/src/dashboard/DashboardState/DashboardState';
import { ToolButton } from '/src/frames/components/ToolButton';
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
    const enabled = props.isOwner(props.playlist);

    return (
      <ToolButton
        className={cn('NewClipButton', props.className)}
        disabled={!enabled}
        iconName="plus"
        label="Clip"
        onClick={() => {
          return onClickNewClipButton(props).then((localClip: ClipT) => {
            navToClip(
              props.playlist.ownerUsername,
              props.playlist.slug,
              localClip.slug
            );
          });
        }}
      />
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
