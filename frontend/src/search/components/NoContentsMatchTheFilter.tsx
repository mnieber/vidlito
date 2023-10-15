import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { L } from '/src/frames/layout';
import { searchCtx } from '/src/search/hooks/useSearchContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './NoContentsMatchTheFilter.scss';
import '/src/frames/components/WallPaper.scss';

export type PropsT = {
  msg: string;
  className?: any;
};

const ContextProps = {
  searchResults: searchCtx.searchResults,
};

export const NoContentsMatchTheFilter = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      <div
        className={cn(
          'NoContentsMatchTheFilter',
          ['WallPaper'],
          ['grow', L.row.skewer(), props.className]
        )}
      >
        <div
          className={cn('NoContentsMatchTheFilter__Message', [
            'grow',
            'self-center',
          ])}
        >
          {props.msg}
        </div>
      </div>
    );
  }, ContextProps)
);
