import { observer } from 'mobx-react-lite';
import { AuthSwitch } from 'src/auth/components';
import { DashboardSwitch } from 'src/dashboard/components';
import { AppFrame } from 'src/frames/components';
import { UseFramesPage } from 'src/frames/pages/UseFramesPage';

type PropsT = {};

export const UrlRouter = observer((props: PropsT) => {
  return (
    <UseFramesPage>
      <AppFrame>
        <AuthSwitch />
        <DashboardSwitch />
      </AppFrame>
    </UseFramesPage>
  );
});
