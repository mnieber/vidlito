import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { ActionsStateProvider } from 'src/actions/components';
import { AuthStateProvider } from 'src/auth/components/AuthStateProvider';
import { ClipsStateProvider } from 'src/clips/components';
import { DashboardStateProvider } from 'src/dashboard/components';
import { colBanner } from 'src/frames/components/Banner';
import { PlaylistsStateProvider } from 'src/playlists/components/PlaylistsStateProvider';
import { UrlRouter } from 'src/routes/components';
import { UrlEventHandlerProvider } from 'src/routes/components/UrlEventHandlerProvider';
import { cn } from 'src/utils/classnames';
import { VideoPlayerStateProvider } from 'src/videos/components';
import './App.scss';

export const history = createBrowserHistory();

export const App = () => {
  return (
    <div className={cn('App', colBanner)}>
      <Router history={history}>
        <UrlEventHandlerProvider>
          <AuthStateProvider>
            <DashboardStateProvider>
              <PlaylistsStateProvider>
                <ClipsStateProvider>
                  <ActionsStateProvider>
                    <VideoPlayerStateProvider>
                      <UrlRouter />
                    </VideoPlayerStateProvider>
                  </ActionsStateProvider>
                </ClipsStateProvider>
              </PlaylistsStateProvider>
            </DashboardStateProvider>
          </AuthStateProvider>
        </UrlEventHandlerProvider>
      </Router>
    </div>
  );
};
