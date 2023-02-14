import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import './ClipTagsView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
};

export const ClipTagsView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const clipTags = props.clip.tags ?? [];
    const tagDivs = clipTags.map((tag: string) => {
      return (
        <div className={cn('ClipTag', 'ClipTag--clip')} key={`clip-${tag}`}>
          {tag}
        </div>
      );
    });
    for (const tag of props.playlist.tags ?? []) {
      if (!clipTags.includes(tag)) {
        tagDivs.push(
          <div
            className={cn('ClipTag', 'ClipTag--playlist')}
            key={`playlist-${tag}`}
          >
            {tag}
          </div>
        );
      }
    }

    return <div className={cn('ClipTagsView', props.className)}>{tagDivs}</div>;
  }, DefaultProps)
);
