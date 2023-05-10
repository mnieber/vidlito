import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { usePreviewButton } from 'src/clips/hooks/usePreviewButton';
import {
  Field,
  FormCancelButton,
  FormFieldLabel,
  FormSaveButton,
  GlobalError,
  MarkdownField,
  NameField,
  SlugField,
  TextField,
  ValuePickerField,
} from 'src/forms/components';
import { TimeField } from 'src/forms/components/TimeField';
import { L } from 'src/frames/layout';
import {
  ClipsUrlEvents,
  UrlEventHandler,
  useUrlEventHandler,
} from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import { form } from './form';

// Import styles
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
      className: 'font-normal',
    });
    const formStateRef = React.useRef<FormState>(null);

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    const l = L.main.MainForm;

    return (
      //
      // 🔳 ClipFormView 🔳
      //
      <div
        className={cn(
          'ClipFormView',
          //
          //
          l.root(),
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
            fieldName="clipForm.url"
            autoFocus={true}
            className={l.Field()}
          >
            <FormFieldLabel label="URL" />
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
          <div className={cn(L.row.skewer(), l.Field())}>
            {
              // 🔳 StartTimeField 🔳
            }
            <Field className={cn('mr-2')} fieldName="clipForm.startTimeS">
              <FormFieldLabel label="START TIME" />
              <TimeField
                videoPlayerState={props.videoPlayerState}
                controlled={true}
                tabIndex={2}
              />
            </Field>
            {
              // 🔳 EndTimeField 🔳
            }
            <Field fieldName="clipForm.endTimeS">
              <FormFieldLabel label="END TIME" />
              <TimeField
                videoPlayerState={props.videoPlayerState}
                controlled={true}
                tabIndex={4}
              />
            </Field>
          </div>
          {
            // 🔳 NameField 🔳
          }
          <Field fieldName="clipForm.name" className={l.Field()}>
            <FormFieldLabel label="NAME" />
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
          {
            // 🔳 SlugField 🔳
          }
          <Field fieldName="clipForm.slug" className={l.Field()}>
            <FormFieldLabel label="SLUG" />
            <SlugField relatedFieldName="clipForm.name" />
          </Field>
          {
            // 🔳 TagsField 🔳
          }
          <Field fieldName="clipForm.tags" className={l.Field()}>
            <FormFieldLabel label="TAGS" />
            <ValuePickerField
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
            fieldName="clipForm.description"
            tabOnEnter={false}
            className={l.Field()}
          >
            <FormFieldLabel label="DESCRIPTION" buttons={[showPreviewButton]} />
            <MarkdownField
              tabIndex={8}
              controlled={true}
              preview={descriptionPreview}
            />
          </Field>
          {
            // 🔳 Buttons 🔳
          }
          <div className={cn(l.Buttons())}>
            <FormCancelButton
              className={cn(l.Button.root(), l.Button.gap())}
              tabIndex={10}
              label="Cancel"
            />
            <FormSaveButton
              tabIndex={10}
              label="Save"
              className={cn(l.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
