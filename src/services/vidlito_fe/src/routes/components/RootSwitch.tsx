import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { AuthSwitch } from '/src/auth/components';
import { DashboardSwitch } from '/src/dashboard/components';
import { AppFrame } from '/src/frames/components';

type PropsT = {};

export const RootSwitch = observer((props: PropsT) => {
  return (
    <AppFrame>
      <Switch>
        {
          // The auth pages use the paths of the blogs example
        }
        <Route path={['/sign-in', '/sign-up', '/account']}>
          <AuthSwitch />
        </Route>
        <Route path="/">
          <DashboardSwitch />
        </Route>
      </Switch>
    </AppFrame>
  );
});
