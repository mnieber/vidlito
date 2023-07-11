import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipEditButton } from '/src/clips/components/ClipEditButton';
import { MarkdownView } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { AuthorCard } from '/src/playlists/components/AuthorCard';
import { TagsCard } from '/src/playlists/components/TagsCard';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.dashboardState,
};

export const ClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.clip)) return <ClipViewLoader {...props} />;

    const description = props.clip?.description ?? '';

    return (
      <div
        className={cn(
          'ClipView',
          //
          //
          'py-[18px] px-4',
          props.className
        )}
      >
        <div className={cn(L.row.skewer(), 'grow', 'justify-between')}>
          <AuthorCard className="self-end" />
          <ClipEditButton
            showPlaylist={props.dashboardState.showPlaylistDescription}
          />
        </div>
        <TagsCard className="mt-2" />
        {!!description.length && (
          <MarkdownView text={description} className="mt-4" />
        )}
      </div>
    );
  }, DefaultProps)
);

const ClipViewLoader = observer((props: PropsT & typeof DefaultProps) => {
  return (
    <div
      className={cn(
        'ClipViewLoader',
        'h-[36px]',
        'rounded bg-gray-100',
        props.className
      )}
    ></div>
  );
});
