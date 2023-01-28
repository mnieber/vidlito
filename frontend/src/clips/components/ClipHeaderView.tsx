import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './ClipHeaderView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEditing,
  ...dps.playlist,
};

export const ClipHeaderView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'ClipHeaderView',
          'grid grid-cols-[1fr,1fr]',
          props.className
        )}
      >
        <div className={cn('ClipHeaderView__Lhs', rowSkewer, 'justify-start')}>
          {/*             */}
          {/* 🟩 Title 🟩 */}
          {/*             */}
          <div className={cn('ClipHeaderView__Title')}>
            <div className={cn('ClipHeaderView__TitleName', rowSkewer)}>
              <div className={cn('ClipHeaderView__PlaylistName')}>
                {props.playlist.name}
              </div>
              <div className={cn('ClipHeaderView__ClipName', 'ml-2')}>
                {props.clip.name}
              </div>
            </div>
            <div className={cn('ClipHeaderView__TitleAuthor')}>
              By: {props.playlist.owner.displayName}
            </div>
          </div>
        </div>
        <div className={cn('ClipHeaderView__Rhs', rowSkewer, 'justify-end')}>
          {/*                  */}
          {/* 🟩 EditButton 🟩 */}
          {/*                  */}
          <button
            className={cn(
              'ClipHeaderView__RhsContents',
              mainButton,
              'self-start'
            )}
            onClick={() => props.clipsEditing.enable()}
          >
            <Icon name="pencil" />
            Edit
          </button>
        </div>
      </div>
    );
  }, DefaultProps)
);
