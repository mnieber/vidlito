import { ActionsStateProvider } from 'src/actions/components';
import { ClipsStateProvider } from 'src/clips/components';
import { DashboardStateProvider } from 'src/dashboard/components';
import { PlaylistsStateProvider } from 'src/playlists/components/PlaylistsStateProvider';
import { LocationStateProvider, UrlRouter } from 'src/routes/components';
import { cn } from 'src/utils/classnames';
import { VideoPlayerStateProvider } from 'src/videos/components';
import './App.scss';

export const App = () => {
  return (
    <div
      className={cn('App', 'flex flex-col', 'mx-auto px-2', 'xl:w-4/5 xl:px-0')}
    >
      <LocationStateProvider>
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
      </LocationStateProvider>
    </div>
  );
};
