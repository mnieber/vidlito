import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
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
  ValuePickerField,
} from 'src/forms/components';
import { TimeField } from 'src/forms/components/TimeField';
import { colBanner, rowSkewer } from 'src/frames/components';
import {
  ClipsUrlEventsT,
  UrlEventHandler,
  useUrlEventHandler,
} from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import './index.scss';

const field = ['uppercase', 'text-mossGreen text-sm', 'tracking-wider'];
const fieldLabel = ['mb-1'];
const input = [
  'mb-6',
  'bg-gray-200',
  'text-gray-700 text-md',
  'p-2',
  'rounded-lg',
];

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
          <GlobalError />
          <Field
            className={cn(field)}
            labelClassName={cn(fieldLabel)}
            fieldName="clipForm.url"
            label="Url"
            autoFocus={true}
          >
            <TextField
              className={cn(input)}
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
              className={cn(field, 'mr-2')}
              labelClassName={cn(fieldLabel)}
              fieldName="clipForm.startTimeS"
              label="Start Time"
            >
              <TimeField
                className={cn(input, 'p-0')}
                videoPlayerState={props.videoPlayerState}
                controlled={true}
                tabIndex={2}
              />
            </Field>
            <Field
              className={cn(field)}
              labelClassName={cn(fieldLabel)}
              fieldName="clipForm.endTimeS"
              label="End Time"
            >
              <TimeField
                className={cn(input, 'p-0')}
                videoPlayerState={props.videoPlayerState}
                controlled={true}
                tabIndex={4}
              />
            </Field>
          </div>
          <Field
            className={cn(field)}
            labelClassName={cn(fieldLabel)}
            fieldName="clipForm.name"
            label="Name"
          >
            <NameField
              className={cn(input)}
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
            className={cn(field)}
            labelClassName={cn(fieldLabel)}
            fieldName="clipForm.slug"
            label="Slug"
          >
            <SlugField
              className={cn(input, 'p-0')}
              relatedFieldName="clipForm.name"
            />
          </Field>
          <Field
            className={cn(field)}
            labelClassName={cn(fieldLabel)}
            fieldName="clipForm.description"
            label="Description"
            tabOnEnter={false}
            buttons={[showPreviewButton]}
          >
            <MarkdownField
              className={cn(input)}
              tabIndex={8}
              controlled={true}
              preview={descriptionPreview}
            />
          </Field>
          <Field
            className={cn(field)}
            labelClassName={cn(fieldLabel)}
            fieldName="clipForm.tags"
            label="Tags"
          >
            <ValuePickerField
              className={cn(input)}
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
