import { observer } from 'mobx-react-lite';
import { Icon, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { VideoController } from 'src/videos/VideoController';
import './PlayVideoIcon.scss';

export type PropsT = {
  visible: boolean;
  className?: any;
  videoController: VideoController;
};

export const PlayVideoIcon = observer((props: PropsT) => {
  return props.visible ? (
    <div
      className={cn(rowSkewer)}
      onClick={() => {
        props.videoController.togglePlay();
      }}
    >
      <Icon name={props.videoController.isPlaying ? 'clock' : 'play-circle'} />
    </div>
  ) : (
    <div className={cn('w-[28px]')}></div>
  );
});
