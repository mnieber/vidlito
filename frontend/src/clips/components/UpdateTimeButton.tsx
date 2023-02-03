import { useFormStateContext } from 'react-form-state-context';
import { VideoController } from 'src/videos/VideoController';

export const UpdateTimeButton = (props: {
  videoController: VideoController;
  fieldName: string;
  className?: any;
}) => {
  const formState = useFormStateContext();
  const timeStamp =
    Math.round(
      1000 * props.videoController.getPlayer()?.getCurrentTime() ?? 0
    ) / 1000;
  return (
    <button
      className={props.className}
      onClick={() => {
        formState.setValue(props.fieldName, timeStamp);
      }}
    >
      Set
    </button>
  );
};
