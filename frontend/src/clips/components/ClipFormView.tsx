import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import {
  FormStateProvider,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import {
  Field,
  GlobalError,
  SaveButton,
  SlugField,
  TextField,
  UpdateSlugButton,
} from 'src/forms/components';
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
    const saveClip = props.clipsEditing.save;
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

    return (
      <div className={cn('ClipFormView', props.className)}>
        <FormStateProvider
          initialValues={initialValues}
          initialErrors={initialErrors}
          handleValidate={handleValidate}
          handleSubmit={handleSubmit}
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
          <Field
            fieldName="clipForm.startTimeMs"
            label="ClipForm startTimeMs"
          ></Field>
          <Field
            fieldName="clipForm.endTimeMs"
            label="ClipForm endTimeMs"
          ></Field>
          <Field
            fieldName="clipForm.description"
            label="ClipForm description"
          ></Field>
          <SaveButton label="Save" disabled={false} />
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
