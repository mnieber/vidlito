import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { rowSkewer } from 'src/frames/components';
import { AccountMenu } from 'src/frames/components/AccountMenu';
import { Logo } from 'src/frames/components/Logo';
import { cn } from 'src/utils/classnames';
import './AppFrame.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {};

export const AppFrame = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn('AppFrame', 'grid grid-rows-[60px,1fr]', props.className)}
      >
        <></>
        {/* Bar */}
        <></>
        <div className={cn('AppFrame__TopBar', 'grid grid-cols-[1fr,1fr]')}>
          <div className={cn('AppFrame__TopBarLhsWrapper', rowSkewer)}>
            <Logo />
          </div>
          <div className={cn('AppFrame__TopBarRhs', rowSkewer, 'justify-end')}>
            <AccountMenu />
          </div>
        </div>
        <div className={cn('AppFrame__BottomMain', 'mt-2')}>
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
