import { observer } from 'mobx-react-lite';
import { useLoadUserId } from 'src/auth/api';
import { SignInLi } from 'src/auth/components/SignInLi';
import { SignOutLi } from 'src/auth/components/SignOutLi';
import { button } from 'src/frames/components/Button';
import { useMenuHandler } from 'src/frames/hooks/useMenuHandler';
import { cn } from 'src/utils/classnames';
import './AccountMenu.scss';

export const AccountMenu = observer(() => {
  const loadUserId = useLoadUserId();
  const menuHandler = useMenuHandler();

  return (
    <div className={cn('AccountMenu', 'uk-inline')}>
      <button data-cy="accountMenu" className={button} type="button">
        Account
      </button>
      <div ref={menuHandler.ref}>
        <ul className="uk-nav uk-dropdown-nav">
          {!loadUserId.data?.isAuthenticated && (
            <SignInLi menuHandler={menuHandler} />
          )}
          {loadUserId.data?.isAuthenticated && (
            <SignOutLi menuHandler={menuHandler} />
          )}
        </ul>
      </div>
    </div>
  );
});
