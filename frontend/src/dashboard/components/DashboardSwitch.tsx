import { Route, Switch } from 'react-router-dom';
import { ActionsSwitch } from '/src/actions/components/ActionsSwitch';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import { Dashboard } from '/src/dashboard/components/Dashboard';
import { MainView } from '/src/dashboard/components/MainView';
import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { ForwardToLastUrlEffect } from '/src/frames/components/ForwardToLastUrlEffect';
import { PageNotFound } from '/src/frames/components/PageNotFound';
import { TermsAndConditionsPage } from '/src/frames/components/TermsAndConditionsPage';
import { DashboardNavHandler } from '/src/frames/pages/DashboardNavHandler';
import { PlaylistSwitch } from '/src/playlists/components/PlaylistSwitch';
import { getRouteFns } from '/src/routes/routeTable';
import { SearchSwitch } from '/src/search/components/SearchSwitch';

export type PropsT = {};

const DefaultProps = {
  ...dps.username,
};

export const DashboardSwitch = withDefaultProps(
  (props: PropsT & typeof DefaultProps) => {
    const routeFns = getRouteFns<AuthRoutesT & DashboardRoutesT>();
    return (
      <DashboardNavHandler>
        {
          // 🔳 Dashboard 🔳
        }
        <Dashboard>
          <Switch>
            <MainView>
              <Route exact path={routeFns.termsAndConditions()}>
                <TermsAndConditionsPage />
              </Route>
              <PageNotFound />
              <Route exact={true} path={routeFns.home()}>
                <ForwardToLastUrlEffect />
              </Route>
              <SearchSwitch />
              <ActionsSwitch />
              <PlaylistSwitch />
            </MainView>
          </Switch>
        </Dashboard>
      </DashboardNavHandler>
    );
  },
  DefaultProps
);
