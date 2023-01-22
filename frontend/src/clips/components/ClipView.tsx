import { observer } from 'mobx-react-lite';
import { isLoaded } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipFormView } from 'src/clips/components/ClipFormView';
import { rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { VideoView } from 'src/videos/components';
import UIkit from 'uikit';
import './ClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEditing,
};

export const ClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!isLoaded(props.clip)) {
      return UIkit && <div data-uk-spinner className="" />;
    } else if (!props.clip) return null;

    return (
      <div className={cn('ClipView', props.className)}>
        <></>
        {/* Bar */}
        <></>
        <div className={cn('ClipView__Bar', 'grid grid-cols-[1fr]')}>
          <div className={cn('ClipView__BarRhs', rowSkewer, 'justify-end')}>
            <button
              className={cn('ClipView__BarRhsContents', rowSkewer)}
              onClick={() => props.clipsEditing.enable()}
            >
              Edit
            </button>
          </div>
        </div>
        <></>
        {/* The clip contents */}
        <></>
        {props.clipsEditing.isEditing && <ClipFormView />}
        {!props.clipsEditing.isEditing && (
          <div className={cn('ClipView__Body')}>
            <div className={cn('ClipView__BodyTitle')}>{props.clip.name}</div>
            <VideoView />
          </div>
        )}
      </div>
    );
  }, DefaultProps)
);
