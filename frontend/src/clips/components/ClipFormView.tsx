import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import {
  FormStateProvider,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
  useFormStateContext,
} from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import {
  CancelButton,
  Field,
  GlobalError,
  SaveButton,
  SlugField,
  TextAreaField,
  TextField,
  UpdateSlugButton,
} from 'src/forms/components';
import { colBanner, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { createUUID } from 'src/utils/ids';
import { VideoController } from 'src/videos/VideoController';
import './ClipFormView.scss';

export type PropsT = {
  videoController: VideoController;
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEditing,
};

export const ClipFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const saveClip = props.clipsEditing.save.bind(props.clipsEditing);
    const initialValues = {
      'clipForm.description': props.clip.description ?? null,
      'clipForm.endTimeS': _toSeconds(props.clip.endTimeMs) ?? null,
      'clipForm.id': props.clip.id ?? createUUID(),
      'clipForm.name': props.clip.name ?? null,
      'clipForm.slug': props.clip.slug ?? null,
      'clipForm.startTimeS': _toSeconds(props.clip.startTimeMs) ?? null,
      'clipForm.url': props.clip.url ?? null,
    };
    const initialErrors = {};
    const handleValidate = ({ values, setError }: HandleValidateArgsT) => {
      if (R.isNil(values['clipForm.name'])) {
        setError('clipForm.name', 'This field is required');
      }
    };
    const handleSubmit = ({ formState, values }: HandleSubmitArgsT) => {
      return saveClip(
        unflatten({
          ...values,
          'clipForm.startTimeMs': Math.trunc(
            values['clipForm.startTimeS'] * 1000
          ),
          'clipForm.endTimeMs': Math.trunc(values['clipForm.endTimeS'] * 1000),
          'clipForm.endTimeS': undefined,
          'clipForm.startTimeS': undefined,
        })
      ).then(() => formState.reset(initialValues, initialErrors));
    };
    const handleCancel = ({ formState }: HandleCancelArgsT) => {
      props.clipsEditing.cancel();
    };

    return (
      <div className={cn('ClipFormView', colBanner, props.className)}>
        <FormStateProvider
          initialValues={initialValues}
          initialErrors={initialErrors}
          handleValidate={handleValidate}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        >
          <GlobalError />
          <Field fieldName="clipForm.url" label="Url">
            <TextField controlled={true} />
          </Field>
          <div className={cn(rowSkewer)}>
            <Field
              className={cn('mr-2')}
              fieldName="clipForm.startTimeS"
              label="Start Time"
              buttons={[
                <UpdateTimeButton
                  key="1"
                  className={cn('mr-2')}
                  videoController={props.videoController}
                  fieldName="clipForm.startTimeS"
                />,
                <GoToTimeButton
                  key="2"
                  videoController={props.videoController}
                  fieldName="clipForm.startTimeS"
                />,
              ]}
            >
              <TextField controlled={true} />
            </Field>
            <Field
              fieldName="clipForm.endTimeS"
              label="End Time"
              buttons={[
                <UpdateTimeButton
                  key="1"
                  className={cn('mr-2')}
                  videoController={props.videoController}
                  fieldName="clipForm.endTimeS"
                />,
                <GoToTimeButton
                  key="2"
                  videoController={props.videoController}
                  fieldName="clipForm.endTimeS"
                />,
              ]}
            >
              <TextField controlled={true} />
            </Field>
          </div>
          <Field fieldName="clipForm.name" label="Name">
            <TextField controlled={true} />
          </Field>
          <Field
            fieldName="clipForm.slug"
            label="Slug"
            buttons={[
              <UpdateSlugButton key="1" relatedFieldName="clipForm.name" />,
            ]}
          >
            <SlugField />
          </Field>
          <Field
            fieldName="clipForm.description"
            label="Description"
            tabOnEnter={false}
          >
            <TextAreaField controlled={true} />
          </Field>
          <div className={cn(rowSkewer, 'self-end')}>
            <CancelButton label="Cancel" disabled={false} />
            <SaveButton label="Save" disabled={false} />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);

const UpdateTimeButton = (props: {
  videoController: VideoController;
  fieldName: string;
  className?: any;
}) => {
  const formState = useFormStateContext();
  const timeStamp =
    Math.round(1000 * props.videoController.getPlayer().getCurrentTime()) /
    1000;
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

const GoToTimeButton = (props: {
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
          props.videoController.getPlayer().seekTo(timestamp);
        }
      }}
    >
      Go
    </button>
  );
};

const _toSeconds = (ms: number | undefined) => {
  return ms ? ms / 1000 : null;
};
