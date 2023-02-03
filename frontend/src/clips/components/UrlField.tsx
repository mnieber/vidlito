import { useFormStateContext } from 'react-form-state-context';
import { Field, TextField } from 'src/forms/components';
import { VideoPlayerState } from 'src/videos/hooks/useVideoPlayerState';

export const UrlField = (props: { videoPlayerState: VideoPlayerState }) => {
  const formState = useFormStateContext();
  return (
    <Field fieldName="clipForm.url" label="Url">
      <TextField
        controlled={true}
        onChange={() => {
          props.videoPlayerState.setUrl(formState.values['clipForm.url'], 0);
        }}
      />
    </Field>
  );
};
