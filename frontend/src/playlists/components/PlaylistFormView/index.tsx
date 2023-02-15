import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { usePreviewButton } from 'src/clips/hooks/usePreviewButton';
import {
  CancelButton,
  Field,
  GlobalError,
  MarkdownField,
  SaveButton,
  SlugField,
  TextField,
  UpdateSlugButton,
  ValuePickerField,
} from 'src/forms/components';
import { colBanner, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import './index.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.locationState,
  ...dps.playlist,
  ...dps.playlistsEditing,
  ...dps.playlistsAddition,
};

export const PlaylistFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { showPreviewButton, descriptionPreview } = usePreviewButton({});

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      <div className={cn('PlaylistFormView', colBanner, props.className)}>
        <FormStateProvider
          initialValues={form.getInitialValues(props)}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
            props,
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props)}
        >
          <GlobalError />
          <Field fieldName="playlistForm.name" label="Name">
            <TextField controlled={true} />
          </Field>
          <Field
            fieldName="playlistForm.slug"
            label="Slug"
            buttons={[
              <UpdateSlugButton key="1" relatedFieldName="playlistForm.name" />,
            ]}
          >
            <SlugField />
          </Field>
          <Field
            fieldName="playlistForm.description"
            label="Description"
            tabOnEnter={false}
            buttons={[showPreviewButton]}
          >
            <MarkdownField controlled={true} preview={descriptionPreview} />
          </Field>
          <Field fieldName="clipForm.tags" label="Tags">
            <ValuePickerField
              isCreatable={true}
              isMulti={true}
              pickableValues={['one', 'two']}
              labelFromValue={(x: any) => x}
            />
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
