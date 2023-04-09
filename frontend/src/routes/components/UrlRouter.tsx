import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react-lite';
import { Router } from 'react-router-dom';
import { AuthSwitch } from 'src/auth/components';
import { DashboardSwitch } from 'src/dashboard/components';
import { AppFrame } from 'src/frames/components';
import { PageEventHandlerProvider } from 'src/routes/components/PageEventHandlerProvider';

type PropsT = {};

export const history = createBrowserHistory();

export const UrlRouter = observer((props: PropsT) => {
  return (
    <Router history={history}>
      <PageEventHandlerProvider>
        <AppFrame>
          <AuthSwitch />
          <DashboardSwitch />
        </AppFrame>
      </PageEventHandlerProvider>
    </Router>
  );
});
