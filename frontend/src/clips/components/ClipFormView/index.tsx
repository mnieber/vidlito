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
import { colBanner, rowSkewer } from 'src/frames/components';
import { form as formStyle } from 'src/frames/components/Form';
import {
  ClipsUrlEventsT,
  UrlEventHandler,
  useUrlEventHandler,
} from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import './index.scss';

export type UrlEventsT = ClipsUrlEventsT;
export type UrlEventHandlerT = UrlEventHandler & UrlEventsT;

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
    const urlEvents = useUrlEventHandler<ClipsUrlEventsT>();

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
      <div
        className={cn(
          'ClipFormView',
          colBanner,
          'py-[18px] px-4',
          '',
          'bg-gray-100 text-gray-700',
          'rounded-lg',
          props.className
        )}
      >
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
            label="URL"
            autoFocus={true}
          >
            <FormFieldLabel className={cn(formStyle.fieldLabel)} />
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
              label="START TIME"
            >
              <FormFieldLabel className={cn(formStyle.fieldLabel)} />
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
              label="END TIME"
            >
              <FormFieldLabel className={cn(formStyle.fieldLabel)} />
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
          <Field
            className={cn(formStyle.field)}
            fieldName="clipForm.name"
            label="NAME"
          >
            <FormFieldLabel className={cn(formStyle.fieldLabel)} />
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
          <Field
            className={cn(formStyle.field)}
            fieldName="clipForm.slug"
            label="SLUG"
          >
            <FormFieldLabel className={cn(formStyle.fieldLabel)} />
            <SlugField
              className={cn(formStyle.input, 'p-0')}
              relatedFieldName="clipForm.name"
            />
          </Field>
          {
            // 🔳 TagsField 🔳
          }
          <Field
            className={cn(formStyle.field)}
            fieldName="clipForm.tags"
            label="TAGS"
          >
            <FormFieldLabel className={cn(formStyle.fieldLabel)} />
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
            label="DESCRIPTION"
            tabOnEnter={false}
          >
            <FormFieldLabel
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
            <SaveButton tabIndex={10} label="SAVE" />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
