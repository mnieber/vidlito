import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { IPagination } from '/src/api/pagination/types';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './PageNav.scss';

export type PropsT = {
  pagination: IPagination;
  className?: any;
};

const ContextProps = {};

export const PageNav = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const page = props.pagination.page;
    const pages = [1];

    const pushPage = (newPage: number) => {
      if (
        newPage >= 1 &&
        newPage > pages[pages.length - 1] &&
        newPage <= props.pagination.nrOfPages
      ) {
        pages.push(newPage);
      }
    };

    pushPage(page - 1);
    pushPage(page);
    pushPage(page + 1);
    pushPage(Math.floor(page + props.pagination.nrOfPages / 2));
    pushPage(props.pagination.nrOfPages);

    const targetPage =
      props.pagination.requestedPage > props.pagination.nrOfPages
        ? props.pagination.page
        : props.pagination.requestedPage;
    const itemDivs = pages.map((page: number, idx: number) => {
      const isActive = page === targetPage;
      return (
        <div
          key={page}
          onClick={() => {
            props.pagination.setRequestedPage(page);
          }}
          className={cn(
            'PageNav__Item',
            {
              'PageNav__Item--active': isActive,
              'PageNav__Item--passive': !isActive,
            },
            ['justify-center', L.col.skewer(), { 'ml-1': idx > 0 }]
          )}
        >
          {page}
        </div>
      );
    });

    return (
      <div className={cn('PageNav', [L.row.skewer(), props.className])}>
        <div>
          <Icon
            className={cn('PageNav__Icon', ['mr-2'])}
            name="arrowLeftSmall"
            onClick={() => {
              if (props.pagination.page > 1) {
                props.pagination.setRequestedPage(props.pagination.page - 1);
              }
            }}
          />
        </div>

        {itemDivs}

        <div>
          <Icon
            className={cn('PageNav__Icon', ['ml-2'])}
            name="arrowRightSmall"
            onClick={() => {
              if (props.pagination.page < props.pagination.nrOfPages) {
                props.pagination.setRequestedPage(props.pagination.page + 1);
              }
            }}
          />
        </div>
      </div>
    );
  }, ContextProps)
);
