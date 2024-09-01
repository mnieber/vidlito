import { withContextProps } from 'react-props-from-context';
import { Route, Switch } from 'wouter';
import { ActionsSwitch } from '/src/actions/components/ActionsSwitch';
import { authRoutes } from '/src/auth/routes';
import { Dashboard } from '/src/dashboard/components/Dashboard';
import { MainView } from '/src/dashboard/components/MainView';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { ForwardToLastUrlEffect } from '/src/frames/components/ForwardToLastUrlEffect';
import { PageNotFound } from '/src/frames/components/PageNotFound';
import { TermsAndConditionsPage } from '/src/frames/components/TermsAndConditionsPage';
import { PlaylistSwitch } from '/src/playlists/components/PlaylistSwitch';
import { SearchSwitch } from '/src/search/components/SearchSwitch';

export type PropsT = {};

const ContextProps = {
  username: dashboardCtx.username,
};

export const DashboardSwitch = withContextProps(
  (props: PropsT & typeof ContextProps) => {
    return (
      <Dashboard>
        <Switch>
          <MainView>
            <Route path={authRoutes.termsAndConditions}>
              <TermsAndConditionsPage />
            </Route>
            <PageNotFound />
            <Route path={authRoutes.home}>
              <ForwardToLastUrlEffect />
            </Route>
            <SearchSwitch />
            <ActionsSwitch />
            <PlaylistSwitch />
          </MainView>
        </Switch>
      </Dashboard>
    );
  },
  ContextProps
);
