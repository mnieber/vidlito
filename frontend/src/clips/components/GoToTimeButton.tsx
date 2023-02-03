import * as R from 'ramda';
import { useFormStateContext } from 'react-form-state-context';
import { VideoController } from 'src/videos/VideoController';

export const GoToTimeButton = (props: {
  videoController: VideoController;
  fieldName: string;
  className?: any;
}) => {
  const formState = useFormStateContext();
  return (
    <button
      className={props.className}
      onClick={() => {
        const timestamp = formState.getValue(props.fieldName);
        if (!R.isNil(timestamp)) {
          props.videoController.getPlayer()?.seekTo(timestamp);
        }
      }}
    >
      Go
    </button>
  );
};
