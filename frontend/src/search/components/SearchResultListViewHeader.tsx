import { observer } from 'mobx-react-lite';
import { cn } from '/src/utils/classnames';

// Import styles
import './SearchResultListViewHeader.scss';

export const SearchResultListViewHeader = observer(() => {
  return (
    <div className={cn('SearchResultListViewHeader', 'contents')}>
      <div
        className={cn('SearchResultListViewHeader__Cell', 'text-primaryBlue')}
      >
        Owner
      </div>
      <div
        className={cn('SearchResultListViewHeader__Cell', 'text-primaryBlue')}
      >
        Playlist
      </div>
      <div
        className={cn('SearchResultListViewHeader__Cell', 'text-primaryBlue')}
      >
        #
      </div>
      <div
        className={cn('SearchResultListViewHeader__Cell', 'text-primaryBlue')}
      >
        Clip
      </div>
    </div>
  );
});
