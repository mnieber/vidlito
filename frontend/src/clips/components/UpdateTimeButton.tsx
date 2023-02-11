import { rowSkewer } from 'src/frames/components';
import { useFormStateContext } from 'react-form-state-context';
import { VideoController } from 'src/videos/VideoController';
import { cn } from 'src/utils/classnames';
import './UpdateTimeButton.scss';

export type PropsT = {
  videoController: VideoController;
  fieldName: string;
  className?: any;
};

export const UpdateTimeButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const timeStamp =
    Math.round(
      1000 * props.videoController.getPlayer()?.getCurrentTime() ?? 0
    ) / 1000;
  return (
    <button
      className={cn('UpdateTimeButton', rowSkewer, props.className)}
      onClick={() => {
        formState.setValue(props.fieldName, timeStamp);
      }}
    >
      Set
    </button>
  );
};
