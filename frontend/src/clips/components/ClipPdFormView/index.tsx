import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { usePreviewButton } from '/src/clips/hooks/usePreviewButton';
import {
  Field,
  FormCancelButton,
  FormFieldLabel,
  FormSaveButton,
  MarkdownField,
  ValuePickerField,
} from '/src/forms/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.clipPd,
  ...dps.clipPdEdit,
  ...dps.searchState,
};

export const ClipPdFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { showPreviewButton, descriptionPreview } = usePreviewButton({
      tabIndex: 9,
      className: 'font-normal',
    });
    const formStateRef = React.useRef<FormState>(null);

    if (!props.clipPd) {
      return null;
    }

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    const l = L.main.MainForm;

    return (
      //
      // 🔳 ClipPdFormView 🔳
      //
      <div
        className={cn(
          'ClipPdFormView',
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
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props)}
        >
          {
            // 🔳 TagsField 🔳
          }
          <Field fieldName="clipPdForm.tags" className={l.Field()}>
            <FormFieldLabel label="TAGS" />
            <ValuePickerField
              tabIndex={9}
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
            fieldName="clipPdForm.description"
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
