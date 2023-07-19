import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { onClickNewClipButton } from '/src/clips/components/NewClipButton';
import { CtaButtonL } from '/src/frames/components/CtaButton';
import { Icon } from '/src/frames/components/Icon';
import { WallPaperCardL } from '/src/frames/components/WallPaperCard';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './CreateFirstClip.scss';
import '/src/frames/components/WallPaper.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
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
      <div
        className={cn(
          'CreateFirstClip',
          ['WallPaper'],
          [WallPaperCardL.root(), props.className]
        )}
      >
        <button
          className={cn(
            'CreateFirstClip__Button',
            'w-[280px]',
            'self-center',
            CtaButtonL.root(),
            CtaButtonL.color.darkBlueOnSkyBlue()
          )}
          onClick={() => {
            onClickNewClipButton(props);
          }}
        >
          <Icon className={cn(CtaButtonL.icon())} name="plus" />
          Create first clip
        </button>
      </div>
    );
  }, DefaultProps)
);

export const CreateFirstClipLoader = (props: PropsT) => {
  return <div className={cn(L.col.banner())}></div>;
};
