import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { AuthSwitch } from 'src/auth/components';
import { DashboardSwitch } from 'src/dashboard/components';
import { UseFramesPage } from 'src/frames/pages/UseFramesPage';

type PropsT = {};

export const UrlRouter = observer((props: PropsT) => {
  return (
    <UseFramesPage>
      <Switch>
        <Route path="/auth">
          <AuthSwitch />
        </Route>
        <Route path="/">
          <DashboardSwitch />
        </Route>
      </Switch>
    </UseFramesPage>
  );
});
