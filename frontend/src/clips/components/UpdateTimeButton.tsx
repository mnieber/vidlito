import { useFormStateContext } from 'react-form-state-context';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';
import { VideoController } from 'src/videos/VideoController';

// Import styles
import './UpdateTimeButton.scss';

export type PropsT = {
  videoController: VideoController;
  fieldName: string;
  tabIndex?: number;
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
      tabIndex={props.tabIndex}
      className={cn('UpdateTimeButton', L.row.skewer(), props.className)}
      onClick={() => {
        formState.setValue(props.fieldName, timeStamp);
      }}
    >
      set
    </button>
  );
};
