import { QueryClientProvider } from '@tanstack/react-query';
import * as R from 'ramda';
import { Router } from 'react-router-dom';
import { ActionsStateProvider } from '/src/actions/components';
import { queryClient } from '/src/api/queryClient';
import { AuthStateProvider } from '/src/auth/components/AuthStateProvider';
import { ClipsStateProvider } from '/src/clips/components';
import { ClipVideoKeyHandler } from '/src/clips/components/ClipVideoKeyHandler';
import { DashboardStateProvider } from '/src/dashboard/components';
import { L } from '/src/frames/layout';
import { PlaylistsStateProvider } from '/src/playlists/components/PlaylistsStateProvider';
import { RootSwitch } from '/src/routes/components';
import { history } from '/src/routes/history';
import { SearchStateProvider } from '/src/search/components/SearchStateProvider';
import { cn } from '/src/utils/classnames';
import { VideoPlayerStateProvider } from '/src/videos/components';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <AuthStateProvider>
          <DashboardStateProvider>
            <SearchStateProvider>
              <PlaylistsStateProvider>
                <ClipsStateProvider>
                  <ActionsStateProvider>
                    <VideoPlayerStateProvider>
                      <ClipVideoKeyHandler>
                        <AppBody>
                          <RootSwitch />
                        </AppBody>
                      </ClipVideoKeyHandler>
                    </VideoPlayerStateProvider>
                  </ActionsStateProvider>
                </ClipsStateProvider>
              </PlaylistsStateProvider>
            </SearchStateProvider>
          </DashboardStateProvider>
        </AuthStateProvider>
      </Router>
    </QueryClientProvider>
  );
};

const AppBody = (props: React.PropsWithChildren<{}>) => {
  return (
    <div
      id="App"
      className={cn('App', [
        R.values({
          root: L.col.banner(),
          // 320px = breakpoints.xs
          size: `min-width-[320px] h-screen`,
          scroll: 'overflow-x-hidden',
        }),
      ])}
      tabIndex={0}
      ref={(x: any) => x?.focus()}
    >
      {props.children}
    </div>
  );
};
