import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { usePreviewButton } from 'src/clips/hooks/usePreviewButton';
import { MainView_ } from 'src/dashboard/components/MainView';
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
      className: 'font-normal',
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
            fieldName="clipForm.url"
            autoFocus={true}
            className={MainView_.fieldStack}
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
          <div className={cn(rowSkewer, MainView_.fieldStack)}>
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
          <Field fieldName="clipForm.name" className={MainView_.fieldStack}>
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
          <Field fieldName="clipForm.slug" className={MainView_.fieldStack}>
            <FormFieldLabel label="SLUG" />
            <SlugField relatedFieldName="clipForm.name" />
          </Field>
          {
            // 🔳 TagsField 🔳
          }
          <Field fieldName="clipForm.tags" className={MainView_.fieldStack}>
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
            className={MainView_.fieldStack}
          >
            <FormFieldLabel label="DESCRIPTION" buttons={[showPreviewButton]} />
            <MarkdownField
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
