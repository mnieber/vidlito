import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { cn } from '/src/utils/classnames';

// Import styles
import './TagsCard.scss';

export type PropsT = { className?: any };

const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
};

export const TagsCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const tagDivs = [];

    for (const tag of props.playlist?.tags ?? []) {
      tagDivs.push(<div className={cn('TagsCard__PlaylistTag')}>{tag}</div>);
    }

    for (const tag of props.clip?.tags ?? []) {
      tagDivs.push(
        <div className={cn('TagsCard__ClipTag', 'mr-2')} key={tag}>
          {tag}
        </div>
      );
    }

    return <>{tagDivs}</>;
  }, DefaultProps)
);
