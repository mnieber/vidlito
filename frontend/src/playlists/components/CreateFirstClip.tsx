import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './CreateFirstClip.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clips,
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
          'flex flex-col justify-evenly',
          'h-full',
          'w-full bg-red-300',
          props.className
        )}
      >
        <button
          className={cn(
            'CreateFirstClip__Button',
            'w-[280px]',
            'self-center',
            L.CtaButton.root(),
            L.CtaButton.color.darkBlueOnSkyBlue()
          )}
        >
          <Icon className={cn(L.CtaButton.icon())} name="plus" />
          Create first clip
        </button>
        <button
          className={cn(
            'CreateFirstClip__Button',
            'w-[280px]',
            'self-center',
            L.CtaButton.root(),
            L.CtaButton.color.darkBlueOnSkyBlue()
          )}
        >
          <Icon className={cn(L.CtaButton.icon())} name="pencil" />
          Edit playlist
        </button>
      </div>
    );
  }, DefaultProps)
);

export const CreateFirstClipLoader = (props: PropsT) => {
  return <div className={cn(L.col.banner())}></div>;
};
