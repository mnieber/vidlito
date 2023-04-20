import * as R from 'ramda';
import { useFormStateContext } from 'react-form-state-context';
import { rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { VideoController } from 'src/videos/VideoController';
import './GoToTimeButton.scss';

export type PropsT = {
  videoController: VideoController;
  fieldName: string;
  tabIndex?: number;
  className?: any;
};

export const GoToTimeButton = (props: PropsT) => {
  const formState = useFormStateContext();
  return (
    <button
      className={cn('GoToTimeButton', rowSkewer, props.className)}
      tabIndex={props.tabIndex}
      onClick={() => {
        const timestamp = formState.getValue(props.fieldName);
        if (!R.isNil(timestamp)) {
          props.videoController.getPlayer()?.seekTo(timestamp);
        }
      }}
    >
      go
    </button>
  );
};
