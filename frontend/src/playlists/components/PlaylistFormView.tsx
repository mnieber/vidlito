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
import { createUUID } from 'src/utils/ids';
import './PlaylistFormView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsEditing,
  ...dps.playlist,
};

export const PlaylistFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const saveClip = props.clipsEditing.save.bind(props.clipsEditing);
    const initialValues = {
      'clipForm.description': props.playlist.description ?? null,
      'clipForm.id': props.playlist.id ?? createUUID().hex,
      'clipForm.name': props.playlist.name ?? null,
      'clipForm.slug': props.playlist.slug ?? null,
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
      <div className={cn('PlaylistFormView', colBanner, props.className)}>
        <FormStateProvider
          initialValues={initialValues}
          initialErrors={initialErrors}
          handleValidate={handleValidate}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        >
          <GlobalError />
          <Field fieldName="clipForm.name" label="ClipForm Name">
            <TextField controlled={true} />
          </Field>
          <Field
            fieldName="clipForm.slug"
            label="ClipForm Slug"
            buttons={[
              <UpdateSlugButton key="1" relatedFieldName="clipForm.name" />,
            ]}
          >
            <SlugField />
          </Field>
          <Field fieldName="clipForm.description" label="ClipForm Description">
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
