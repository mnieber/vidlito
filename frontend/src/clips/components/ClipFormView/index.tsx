import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { GoToTimeButton } from 'src/clips/components/GoToTimeButton';
import { UpdateTimeButton } from 'src/clips/components/UpdateTimeButton';
import { UrlField } from 'src/clips/components/UrlField';
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
  ...dps.clip,
  ...dps.clipsEditing,
  ...dps.clipsAddition,
  ...dps.videoPlayerState,
  ...dps.urlState,
};

export const ClipFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { showPreviewButton, descriptionPreview } = usePreviewButton({});

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      <div className={cn('ClipFormView', colBanner, props.className)}>
        <FormStateProvider
          initialValues={initialValues}
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
          <UrlField videoPlayerState={props.videoPlayerState} />
          <div className={cn(rowSkewer)}>
            <Field
              className={cn('mr-2')}
              fieldName="clipForm.startTimeS"
              label="Start Time"
              buttons={[
                <UpdateTimeButton
                  key="1"
                  className={cn('mr-2')}
                  videoController={props.videoPlayerState.videoController}
                  fieldName="clipForm.startTimeS"
                />,
                <GoToTimeButton
                  key="2"
                  videoController={props.videoPlayerState.videoController}
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
                  videoController={props.videoPlayerState.videoController}
                  fieldName="clipForm.endTimeS"
                />,
                <GoToTimeButton
                  key="2"
                  videoController={props.videoPlayerState.videoController}
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
