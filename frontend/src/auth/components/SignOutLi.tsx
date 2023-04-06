import { useSignOut } from 'src/auth/endpoints';
import { useAuthStateContext } from 'src/auth/hooks';
import { RouterLink } from 'src/routes/components';
import { history } from 'src/routes/components/UrlRouter';
import { useRoutes } from 'src/routes/hooks/useRoutes';

type PropsT = {
  menuHandler: any;
};

export const SignOutLi = (props: PropsT) => {
  const authState = useAuthStateContext(true);
  const signOut = useSignOut(authState).mutateAsync;
  const routes = useRoutes();

  return (
    <li className="uk-active">
      <RouterLink
        dataCy="signOutMenuItem"
        to={routes.signIn()}
        onClick={() =>
          signOut({}).then(() => {
            props.menuHandler.closeDropDown();
            history.push(routes.signIn());
          })
        }
      >
        Sign out
      </RouterLink>
    </li>
  );
};
