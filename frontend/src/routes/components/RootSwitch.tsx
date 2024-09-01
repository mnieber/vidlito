import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'wouter';
import { AuthSwitch } from '/src/auth/components';
import { DashboardSwitch } from '/src/dashboard/components';
import { AppFrame } from '/src/frames/components';

type PropsT = {};

export const RootSwitch = observer((props: PropsT) => {
  return (
    <AppFrame>
      <Switch>
        <Route path="/auth">
          <AuthSwitch />
        </Route>
        <Route path="/">
          <DashboardSwitch />
        </Route>
      </Switch>
    </AppFrame>
  );
});
