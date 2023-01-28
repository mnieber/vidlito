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
      <div className={cn('ClipHeaderView', rowSkewer)}>
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
            {/*                  */}
            {/* 🟩 EditButton 🟩 */}
            {/*                  */}
            <button
              className={cn('ClipHeaderView__RhsContents', mainButton, 'ml-2')}
              onClick={() => props.clipsEditing.enable()}
            >
              <Icon name="pencil" />
              Edit
            </button>
          </div>
          <div className={cn('ClipHeaderView__TitleAuthor')}>
            By: {props.playlist.owner.displayName}
          </div>
        </div>
      </div>
    );
  }, DefaultProps)
);
