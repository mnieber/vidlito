import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import {
  FormStateProvider,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import {
  CancelButton,
  Field,
  GlobalError,
  SaveButton,
  SlugField,
  TextField,
  UpdateSlugButton,
} from 'src/forms/components';
import { colBanner, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './ClipFormView.scss';

export type PropsT = {
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
      'clipForm.endTimeMs': props.clip.endTimeMs ?? null,
      'clipForm.name': props.clip.name ?? null,
      'clipForm.slug': props.clip.slug ?? null,
      'clipForm.startTimeMs': props.clip.startTimeMs ?? null,
      'clipForm.url': props.clip.url ?? null,
    };
    const initialErrors = {};
    const handleValidate = ({ values, setError }: HandleValidateArgsT) => {
      if (R.isNil(values['clipForm.name'])) {
        setError('clipForm.name', 'This field is required');
      }
    };
    const handleSubmit = ({ formState, values }: HandleSubmitArgsT) => {
      return saveClip(unflatten(values)).then(() =>
        formState.reset(initialValues, initialErrors)
      );
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
          <Field fieldName="clipForm.name" label="ClipForm name">
            <TextField controlled={true} />
          </Field>
          <Field
            fieldName="clipForm.slug"
            label="ClipForm slug"
            buttons={[
              <UpdateSlugButton key="1" relatedFieldName="clipForm.name" />,
            ]}
          >
            <SlugField />
          </Field>
          <Field fieldName="clipForm.url" label="ClipForm url">
            <TextField controlled={true} />
          </Field>
          <Field fieldName="clipForm.startTimeMs" label="ClipForm startTimeMs">
            <TextField controlled={true} />
          </Field>
          <Field fieldName="clipForm.endTimeMs" label="ClipForm endTimeMs">
            <TextField controlled={true} />
          </Field>
          <Field fieldName="clipForm.description" label="ClipForm description">
            <TextField controlled={true} />
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
