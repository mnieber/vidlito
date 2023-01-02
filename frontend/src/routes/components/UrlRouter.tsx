import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react-lite';
import { Router } from 'react-router-dom';
import { AuthSwitch } from 'src/auth/components';
import { DashboardSwitch } from 'src/dashboard/components';

type PropsT = {};

export const history = createBrowserHistory();

export const UrlRouter = observer((props: PropsT) => {
  return (
    <Router history={history}>
      <AuthSwitch />
      <DashboardSwitch />
    </Router>
  );
});
