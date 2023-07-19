import { QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'react-router-dom';
import { ActionsStateProvider } from '/src/actions/components';
import { queryClient } from '/src/api/queryClient';
import { AuthStateProvider } from '/src/auth/components/AuthStateProvider';
import { ClipsStateProvider } from '/src/clips/components';
import { DashboardStateProvider } from '/src/dashboard/components';
import { L, breakpoints } from '/src/frames/layout';
import { history } from '/src/navHandler/NavHandler';
import { PlaylistsStateProvider } from '/src/playlists/components/PlaylistsStateProvider';
import { UrlRouter } from '/src/routes/components';
import { RouteTableProvider } from '/src/routes/components/RouteTableProvider';
import { SearchStateProvider } from '/src/search/components/SearchStateProvider';
import { cn } from '/src/utils/classnames';
import { VideoPlayerStateProvider } from '/src/videos/components';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        {
          // 🔳 App 🔳
        }
        <div
          className={cn(
            'App',
            [],
            [
              L.col.banner(),
              `min-width-[${breakpoints.xs}] h-[100vh] overflow-x-hidden`,
            ]
          )}
        >
          <RouteTableProvider>
            <AuthStateProvider>
              <DashboardStateProvider>
                <SearchStateProvider>
                  <PlaylistsStateProvider>
                    <ClipsStateProvider>
                      <ActionsStateProvider>
                        <VideoPlayerStateProvider>
                          <UrlRouter />
                        </VideoPlayerStateProvider>
                      </ActionsStateProvider>
                    </ClipsStateProvider>
                  </PlaylistsStateProvider>
                </SearchStateProvider>
              </DashboardStateProvider>
            </AuthStateProvider>
          </RouteTableProvider>
        </div>
      </Router>
    </QueryClientProvider>
  );
};
