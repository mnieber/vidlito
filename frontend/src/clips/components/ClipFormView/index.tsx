import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { usePreviewButton } from 'src/clips/hooks/usePreviewButton';
import {
  CancelButton,
  Field,
  FormFieldLabel,
  GlobalError,
  MarkdownField,
  NameField,
  SaveButton,
  SlugField,
  TextField,
  ValuePickerField,
} from 'src/forms/components';
import { TimeField } from 'src/forms/components/TimeField';
import { rowSkewer } from 'src/frames/components';
import { primaryButton } from 'src/frames/components/Button';
import { card } from 'src/frames/components/Card';
import { form as formStyle } from 'src/frames/components/Form';
import {
  ClipsUrlEvents,
  UrlEventHandler,
  useUrlEventHandler,
} from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import './index.scss';

export type UrlEventsT = typeof ClipsUrlEvents;
export type UrlEventHandlerT = UrlEventHandler & UrlEventsT;

const useUrlEvents = () => useUrlEventHandler<UrlEventsT>();

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
    const urlEvents = useUrlEvents();

    const { showPreviewButton, descriptionPreview } = usePreviewButton({
      tabIndex: 9,
    });
    const formStateRef = React.useRef<FormState>(null);

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      //
      // 🔳 ClipFormView 🔳
      //
      <div className={cn('ClipFormView', card, props.className)}>
        {
          // 🔳 FormStateProvider 🔳
        }
        <FormStateProvider
          formStateRef={formStateRef}
          initialValues={initialValues}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
            props,
            urlEvents,
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props, urlEvents)}
        >
          {
            // 🔳 UrlField 🔳
          }
          <GlobalError />
          <Field
            className={cn(formStyle.field)}
            fieldName="clipForm.url"
            autoFocus={true}
          >
            <FormFieldLabel className={cn(formStyle.fieldLabel)} label="URL" />
            <TextField
              className={cn(formStyle.input)}
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
            {
              // 🔳 StartTimeField 🔳
            }
            <Field
              className={cn(formStyle.field, 'mr-2')}
              fieldName="clipForm.startTimeS"
            >
              <FormFieldLabel
                className={cn(formStyle.fieldLabel)}
                label="START TIME"
              />
              <TimeField
                className={cn(formStyle.input, 'p-0')}
                videoPlayerState={props.videoPlayerState}
                controlled={true}
                tabIndex={2}
              />
            </Field>
            {
              // 🔳 EndTimeField 🔳
            }
            <Field
              className={cn(formStyle.field)}
              fieldName="clipForm.endTimeS"
            >
              <FormFieldLabel
                className={cn(formStyle.fieldLabel)}
                label="END TIME"
              />
              <TimeField
                className={cn(formStyle.input, 'p-0')}
                videoPlayerState={props.videoPlayerState}
                controlled={true}
                tabIndex={4}
              />
            </Field>
          </div>
          {
            // 🔳 NameField 🔳
          }
          <Field className={cn(formStyle.field)} fieldName="clipForm.name">
            <FormFieldLabel className={cn(formStyle.fieldLabel)} label="NAME" />
            <NameField
              className={cn(formStyle.input)}
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
          {
            // 🔳 SlugField 🔳
          }
          <Field className={cn(formStyle.field)} fieldName="clipForm.slug">
            <FormFieldLabel className={cn(formStyle.fieldLabel)} label="SLUG" />
            <SlugField
              className={cn(formStyle.input, 'p-0')}
              relatedFieldName="clipForm.name"
            />
          </Field>
          {
            // 🔳 TagsField 🔳
          }
          <Field className={cn(formStyle.field)} fieldName="clipForm.tags">
            <FormFieldLabel className={cn(formStyle.fieldLabel)} label="TAGS" />
            <ValuePickerField
              className={cn()}
              tabIndex={9}
              isCreatable={true}
              placeholder=""
              isMulti={true}
              pickableValues={[
                'one',
                'two',
                'three',
                'four',
                'five',
                'six',
                'seven',
                'eight',
                'nine',
                'ten',
              ]}
              labelFromValue={(x: any) => x}
            />
          </Field>
          {
            // 🔳 DescriptionField 🔳
          }
          <Field
            className={cn(formStyle.field)}
            fieldName="clipForm.description"
            tabOnEnter={false}
          >
            <FormFieldLabel
              label="DESCRIPTION"
              className={cn(formStyle.fieldLabel)}
              buttons={[showPreviewButton]}
            />
            <MarkdownField
              className={cn(formStyle.input)}
              tabIndex={8}
              controlled={true}
              preview={descriptionPreview}
            />
          </Field>
          <div className={cn(rowSkewer, 'self-end')}>
            <CancelButton className="mr-2" tabIndex={10} label="CANCEL" />
            <SaveButton
              tabIndex={10}
              label="SAVE"
              className={cn(primaryButton)}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
