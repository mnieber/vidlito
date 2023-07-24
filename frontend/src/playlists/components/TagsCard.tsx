import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { cn } from '/src/utils/classnames';

// Import styles
import './TagsCard.scss';

export type PropsT = {
  clipTags: string[];
  playlistTags: string[];
};

const DefaultProps = {};

export const TagsCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const tagDivs = [];

    for (const tag of props.playlistTags) {
      tagDivs.push(
        <div className={cn('TagsCard__PlaylistTag')} key={'p_' + tag}>
          {tag}
        </div>
      );
    }

    for (const tag of props.clipTags) {
      tagDivs.push(
        <div className={cn('TagsCard__ClipTag', 'mr-2')} key={'c_' + tag}>
          {tag}
        </div>
      );
    }

    return <>{tagDivs}</>;
  }, DefaultProps)
);
