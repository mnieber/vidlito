import { observer } from 'mobx-react-lite';
import { useLoadUserId } from 'src/auth/api';
import { SignInLi } from 'src/auth/components/SignInLi';
import { SignOutLi } from 'src/auth/components/SignOutLi';
import { button } from 'src/frames/components/Button';
import { useMenuRef } from 'src/frames/hooks/useMenuRef';
import { cn } from 'src/utils/classnames';
import './AccountMenu.scss';

export const AccountMenu = observer(() => {
  const loadUserId = useLoadUserId();
  const menuRef = useMenuRef();

  return (
    <div className={cn('AccountMenu', 'uk-inline')}>
      <button data-cy="accountMenu" className={button} type="button">
        Account
      </button>
      <div ref={menuRef.ref}>
        <ul className="uk-nav uk-dropdown-nav">
          {!loadUserId.data?.isAuthenticated && <SignInLi menuRef={menuRef} />}
          {loadUserId.data?.isAuthenticated && <SignOutLi menuRef={menuRef} />}
        </ul>
      </div>
    </div>
  );
});
