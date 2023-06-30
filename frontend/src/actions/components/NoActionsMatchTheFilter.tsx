import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './NoActionsMatchTheFilter.scss';

export type PropsT = {
  msg: string;
  className?: any;
};

const DefaultProps = {
  ...dps.actions,
};

export const NoActionsMatchTheFilter = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'NoActionsMatchTheFilter',
          'flex flex-col justify-evenly',
          'w-full',
          'grow',
          props.className
        )}
      >
        <div
          className={cn(
            'NoActionsMatchTheFilter__Card',
            'w-[280px]',
            'self-center',
            L.CtaButton.root(),
            L.CtaButton.color.darkBlueOnSkyBlue()
          )}
        >
          {props.msg}
        </div>
      </div>
    );
  }, DefaultProps)
);
