import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { cn } from '/src/utils/classnames';

// Import styles
import './TagsCard.scss';

export type PropsT = {
  clipTags: string[];
  playlistTags: string[];
};

const ContextProps = {};

export const TagsCard = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const tagDivs = [];

    for (const tag of props.playlistTags) {
      tagDivs.push(
        <div
          className={cn('TagsCard__Tag', 'TagsCard__PlaylistTag')}
          key={'p_' + tag}
        >
          {tag}
        </div>
      );
    }

    for (const tag of props.clipTags) {
      tagDivs.push(
        <div
          className={cn('TagsCard__Tag', 'TagsCard__ClipTag', 'mr-2')}
          key={'c_' + tag}
        >
          {tag}
        </div>
      );
    }

    return <>{tagDivs}</>;
  }, ContextProps)
);
