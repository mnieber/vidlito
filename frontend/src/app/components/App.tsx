import { QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'react-router-dom';
import { ActionsStateProvider } from '/src/actions/components';
import { queryClient } from '/src/api/queryClient';
import { AuthStateProvider } from '/src/auth/components/AuthStateProvider';
import { ClipsStateProvider } from '/src/clips/components';
import { DashboardStateProvider } from '/src/dashboard/components';
import { L, breakpoints } from '/src/frames/layout';
import { PlaylistsStateProvider } from '/src/playlists/components/PlaylistsStateProvider';
import { UrlRouter } from '/src/routes/components';
import { history } from '/src/routes/history';
import { SearchStateProvider } from '/src/search/components/SearchStateProvider';
import { cn } from '/src/utils/classnames';
import { VideoPlayerStateProvider } from '/src/videos/components';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <div
          className={cn('App', [
            L.col.banner(),
            `min-width-[${breakpoints.xs}] h-screen overflow-x-hidden`,
          ])}
        >
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
        </div>
      </Router>
    </QueryClientProvider>
  );
};
