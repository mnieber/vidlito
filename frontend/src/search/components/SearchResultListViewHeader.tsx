import { observer } from 'mobx-react-lite';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchResultListViewHeader.scss';

export const SearchResultListViewHeader = observer(() => {
  return (
    <div className={cn('SearchResultListViewHeader', 'contents')}>
      <div
        className={cn('SearchResultListViewHeader__Cell', 'text-blue-primary')}
      >
        Owner
      </div>
      <div
        className={cn('SearchResultListViewHeader__Cell', 'text-blue-primary')}
      >
        Playlist
      </div>
      <div
        className={cn('SearchResultListViewHeader__Cell', 'text-blue-primary')}
      >
        #
      </div>
      <div
        className={cn('SearchResultListViewHeader__Cell', 'text-blue-primary')}
      >
        Clip
      </div>
    </div>
  );
});
