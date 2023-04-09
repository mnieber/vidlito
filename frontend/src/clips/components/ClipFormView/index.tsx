import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { GoToTimeButton } from 'src/clips/components/GoToTimeButton';
import { UpdateTimeButton } from 'src/clips/components/UpdateTimeButton';
import { usePreviewButton } from 'src/clips/hooks/usePreviewButton';
import {
  CancelButton,
  Field,
  GlobalError,
  MarkdownField,
  NameField,
  SaveButton,
  SlugField,
  TextField,
  UpdateSlugButton,
  ValuePickerField,
} from 'src/forms/components';
import { colBanner, rowSkewer } from 'src/frames/components';
import {
  ClipsPageEventsT,
  PageEventHandler,
  usePageEventHandler,
} from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import './index.scss';

export type PageEventsT = ClipsPageEventsT;
export type PageEventHandlerT = PageEventHandler & PageEventsT;

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEdit,
  ...dps.clipsAddition,
  ...dps.videoPlayerState,
};

export const ClipFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const pageEvents = usePageEventHandler<ClipsPageEventsT>();

    const { showPreviewButton, descriptionPreview } = usePreviewButton({
      tabIndex: 9,
    });
    const formStateRef = React.useRef<FormState>(null);

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      <div className={cn('ClipFormView', colBanner, props.className)}>
        <FormStateProvider
          formStateRef={formStateRef}
          initialValues={initialValues}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
            props,
            pageEvents,
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props, pageEvents)}
        >
          <GlobalError />
          <Field fieldName="clipForm.url" label="Url" autoFocus={true}>
            <TextField
              tabIndex={1}
              controlled={true}
              autoSelect={true}
              onChange={() => {
                const url =
                  formStateRef.current?.values['clipForm.url'] ?? undefined;
                url && props.videoPlayerState.setUrl(url, 0);
              }}
            />
          </Field>
          <div className={cn(rowSkewer)}>
            <Field
              className={cn('mr-2')}
              fieldName="clipForm.startTimeS"
              label="Start Time"
              buttons={[
                <UpdateTimeButton
                  key="1"
                  tabIndex={3}
                  className={cn('mr-2')}
                  videoController={props.videoPlayerState.videoController}
                  fieldName="clipForm.startTimeS"
                />,
                <GoToTimeButton
                  key="2"
                  tabIndex={3}
                  videoController={props.videoPlayerState.videoController}
                  fieldName="clipForm.startTimeS"
                />,
              ]}
            >
              <TextField controlled={true} tabIndex={2} />
            </Field>
            <Field
              fieldName="clipForm.endTimeS"
              label="End Time"
              buttons={[
                <UpdateTimeButton
                  key="1"
                  tabIndex={5}
                  className={cn('mr-2')}
                  videoController={props.videoPlayerState.videoController}
                  fieldName="clipForm.endTimeS"
                />,
                <GoToTimeButton
                  key="2"
                  tabIndex={5}
                  videoController={props.videoPlayerState.videoController}
                  fieldName="clipForm.endTimeS"
                />,
              ]}
            >
              <TextField controlled={true} tabIndex={4} />
            </Field>
          </div>
          <Field fieldName="clipForm.name" label="Name">
            <NameField
              tabIndex={6}
              controlled={true}
              autoSelect={true}
              slugFieldName={
                initialValues['clipForm.slug'] === 'new-clip'
                  ? 'clipForm.slug'
                  : undefined
              }
            />
          </Field>
          <Field
            fieldName="clipForm.slug"
            label="Slug"
            buttons={[
              <UpdateSlugButton
                tabIndex={7}
                key="1"
                relatedFieldName="clipForm.name"
              />,
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
            <MarkdownField
              tabIndex={8}
              controlled={true}
              preview={descriptionPreview}
            />
          </Field>
          <Field fieldName="clipForm.tags" label="Tags">
            <ValuePickerField
              tabIndex={9}
              isCreatable={true}
              isMulti={true}
              pickableValues={['one', 'two']}
              labelFromValue={(x: any) => x}
            />
          </Field>
          <div className={cn(rowSkewer, 'self-end')}>
            <CancelButton tabIndex={10} label="Cancel" />
            <SaveButton tabIndex={10} label="Save" />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
