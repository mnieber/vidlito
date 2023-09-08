import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { onClickNewClipButton } from '/src/clips/components/NewClipButton';
import { CtaButtonS } from '/src/frames/components/CtaButton';
import { Icon } from '/src/frames/components/Icon';
import { MessageCard } from '/src/frames/components/MessageCard';
import { cn } from '/src/utils/classnames';

// Import styles
import './CreateFirstClip.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
  ...dps.clips,
  ...dps.clipsAddition,
  ...dps.clipsSelection,
  ...dps.userProfile,
  ...dps.dashboardState,
};

export const CreateFirstClip = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.clips)) {
      return <CreateFirstClipLoader />;
    }

    return (
      <MessageCard
        className={cn('CreateFirstClip', [props.className])}
        wallPaper={true}
      >
        <button
          className={cn(
            CtaButtonS.root(),
            CtaButtonS.color.darkBlueOnSkyBlue(),
            'CreateFirstClip__Button',
            ['w-[280px]', 'self-center']
          )}
          onClick={() => {
            onClickNewClipButton(props);
          }}
        >
          <Icon className={cn(CtaButtonS.Icon())} name="plus" />
          Create first clip
        </button>
      </MessageCard>
    );
  }, DefaultProps)
);

export const CreateFirstClipLoader = (props: PropsT) => {
  return null;
};
