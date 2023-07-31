import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { usePreviewButton } from '/src/clips/hooks/usePreviewButton';
import { MainFormS } from '/src/dashboard/components/MainForm';
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
} from '/src/forms/components';
import { TimeField } from '/src/forms/components/TimeField';
import { CardS } from '/src/frames/components/Card';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEdit,
  ...dps.clipsAddition,
  ...dps.videoPlayerState,
  ...dps.dashboardState,
  ...dps.searchState,
};

export const ClipFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { showPreviewButton, descriptionPreview } = usePreviewButton({
      tabIndex: 9,
      className: 'font-normal',
    });
    const formStateRef = React.useRef<FormState>(null);

    if (!props.clip) {
      return null;
    }

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      //
      // 🔳 ClipFormView 🔳
      //
      <div
        className={cn(CardS.root(), 'ClipFormView', [
          CardS.color.gray(),
          props.className,
        ])}
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
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props)}
        >
          {
            // 🔳 UrlField 🔳
          }
          <GlobalError className={MainFormS.GlobalError()} />
          <Field fieldName="clipForm.url" className={MainFormS.Field()}>
            <FormFieldLabel label="URL" />
            <TextField
              tabIndex={1}
              controlled={true}
              autoFocus={true}
              autoSelect={true}
              onChange={() => {
                const url =
                  formStateRef.current?.values['clipForm.url'] ?? undefined;
                url && props.videoPlayerState.setUrl(url, 0);
              }}
            />
          </Field>
          {
            // 🔳 NameField 🔳
          }
          <Field fieldName="clipForm.name" className={MainFormS.Field()}>
            <FormFieldLabel label="NAME" />
            <NameField
              tabIndex={2}
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
          <Field fieldName="clipForm.slug" className={MainFormS.Field()}>
            <FormFieldLabel label="SLUG" />
            <SlugField relatedFieldName="clipForm.name" />
          </Field>
          <div className={cn(L.row.skewer(), MainFormS.Field())}>
            {
              // 🔳 StartTimeField 🔳
            }
            <Field className={cn('mr-2')} fieldName="clipForm.startTimeS">
              <FormFieldLabel label="START TIME" />
              <TimeField
                videoPlayerState={props.videoPlayerState}
                controlled={true}
                tabIndex={3}
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
            // 🔳 TagsField 🔳
          }
          <Field fieldName="clipForm.tags" className={MainFormS.Field()}>
            <FormFieldLabel label="TAGS" />
            <ValuePickerField
              tabIndex={5}
              isCreatable={true}
              placeholder=""
              isMulti={true}
              tabOnEnter={false}
              labelFromValue={(x: any) => x}
              loadOptions={props.searchState.tagsCtr.store.loadTags}
            />
          </Field>
          {
            // 🔳 DescriptionField 🔳
          }
          <Field
            fieldName="clipForm.description"
            tabOnEnter={false}
            className={MainFormS.Field()}
          >
            <FormFieldLabel label="DESCRIPTION" buttons={[showPreviewButton]} />
            <MarkdownField
              tabIndex={6}
              controlled={true}
              preview={descriptionPreview}
            />
          </Field>
          {
            // 🔳 Buttons 🔳
          }
          <div className={cn(MainFormS.Buttons())}>
            <FormCancelButton
              className={cn(MainFormS.Button.root(), MainFormS.Button.gap())}
              tabIndex={10}
              label="Cancel"
            />
            <FormSaveButton
              tabIndex={10}
              label="Save"
              className={cn(MainFormS.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
