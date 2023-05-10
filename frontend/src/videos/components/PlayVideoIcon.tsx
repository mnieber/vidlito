import { observer } from 'mobx-react-lite';
import { Icon } from 'src/frames/components';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';
import { VideoController } from 'src/videos/VideoController';

// Import styles
import './PlayVideoIcon.scss';

export type PropsT = {
  visible: boolean;
  loading: boolean;
  videoController: VideoController;
  className?: any;
};

export const PlayVideoIcon = observer((props: PropsT) => {
  return props.visible || props.loading ? (
    <div
      className={cn(
        'PlayVideoIcon',
        {
          'PlayVideoIcon--loading': props.loading,
        },
        //
        //
        L.row.skewer(),
        props.className
      )}
      onClick={() => {
        props.videoController.togglePlay();
      }}
    >
      <Icon
        className={cn('w-full', 'h-full')}
        name={props.videoController.isPlaying ? 'pause' : 'play-circle'}
      />
    </div>
  ) : (
    <div className={cn(props.className)}></div>
  );
});
