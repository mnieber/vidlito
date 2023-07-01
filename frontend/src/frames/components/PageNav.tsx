import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { Pagination } from '/src/playlists/PlaylistsState/facets/Pagination';
import { cn } from '/src/utils/classnames';

// Import styles
import './PageNav.scss';

export type PropsT = {
  pagination: Pagination;
  className?: any;
};

const DefaultProps = {};

export const PageNav = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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

    const itemDivs = pages.map((page: number, idx: number) => {
      const isActive = props.pagination.page === page;
      return (
        <div
          key={page}
          onClick={() => {
            props.pagination.setPage(page);
          }}
          className={cn(
            'PageNav__Item',
            //
            //
            L.col.skewer(),
            'justify-center',
            {
              'PageNav__Item--active': isActive,
              'PageNav__Item--passive': !isActive,
              'ml-1': idx > 0,
            }
          )}
        >
          {page}
        </div>
      );
    });

    return (
      <div
        className={cn(
          'PageNav',
          //
          //
          L.row.skewer(),
          'justify-center gap-1 text-xs font-medium',
          props.className
        )}
      >
        <div>
          <Icon
            className={cn('PageNav__Icon', 'mr-2')}
            name="arrowLeftSmall"
            onClick={() => {
              if (props.pagination.page > 1) {
                props.pagination.setPage(props.pagination.page - 1);
              }
            }}
          />
        </div>

        {itemDivs}

        <div>
          <Icon
            className={cn('PageNav__Icon', 'ml-2')}
            name="arrowRightSmall"
            onClick={() => {
              if (props.pagination.page < props.pagination.nrOfPages) {
                props.pagination.setPage(props.pagination.page + 1);
              }
            }}
          />
        </div>
      </div>
    );
  }, DefaultProps)
);
