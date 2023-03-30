import { observer } from 'mobx-react-lite';
import { Icon, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { VideoController } from 'src/videos/VideoController';
import './PlayVideoIcon.scss';

export type PropsT = {
  visible: boolean;
  videoController: VideoController;
  className?: any;
};

export const PlayVideoIcon = observer((props: PropsT) => {
  return props.visible ? (
    <div
      className={cn('PlayVideoIcon', rowSkewer, props.className)}
      onClick={() => {
        props.videoController.togglePlay();
      }}
    >
      <Icon name={props.videoController.isPlaying ? 'pause' : 'play-circle'} />
    </div>
  ) : (
    <div className={cn('w-[28px]')}></div>
  );
});
