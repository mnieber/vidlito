import { ClipsStateProvider } from 'src/clips/components';
import { PlaylistsStateProvider } from 'src/playlists/components/PlaylistsStateProvider';
import { UrlRouter } from 'src/routes/components';
import { cn } from 'src/utils/classnames';
import './App.scss';

export const App = () => {
  return (
    <div className={cn('App', 'flex flex-col', 'mx-auto xl:w-4/5')}>
      <PlaylistsStateProvider>
        <ClipsStateProvider>
          <UrlRouter />
        </ClipsStateProvider>
      </PlaylistsStateProvider>
    </div>
  );
};
