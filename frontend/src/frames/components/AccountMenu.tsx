import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { SignInLi } from 'src/auth/components/SignInLi';
import { SignOutLi } from 'src/auth/components/SignOutLi';
import { secundaryButton } from 'src/frames/components/Button';
import { useMenuHandler } from 'src/frames/hooks/useMenuHandler';
import { cn, d } from 'src/utils/classnames';
import './AccountMenu.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.isAuthenticated,
};

export const AccountMenu = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const menuHandler = useMenuHandler();

    return (
      <div
        className={cn(d('AccountMenu'), 'mt-4', 'uk-inline', props.className)}
      >
        <button
          data-cy="accountMenu"
          className={cn(secundaryButton, '')}
          type="button"
        >
          <div className={cn('mb-0.5')}>Account</div>
        </button>
        <div ref={menuHandler.ref}>
          <ul className="uk-nav uk-dropdown-nav">
            {!props.isAuthenticated && <SignInLi menuHandler={menuHandler} />}
            {props.isAuthenticated && <SignOutLi menuHandler={menuHandler} />}
          </ul>
        </div>
      </div>
    );
  }, DefaultProps)
);
