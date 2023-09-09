import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { AuthSwitch } from '/src/auth/components';
import { DashboardSwitch } from '/src/dashboard/components';
import { AppFrame } from '/src/frames/components';
import { FramesNavPage } from '/src/frames/pages/FramesNavPage';

type PropsT = {};

export const RootSwitch = observer((props: PropsT) => {
  return (
    <FramesNavPage>
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
    </FramesNavPage>
  );
});
