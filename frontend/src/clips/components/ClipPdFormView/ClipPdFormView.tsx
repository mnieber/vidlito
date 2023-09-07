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
  MarkdownField,
  ValuePickerField,
} from '/src/forms/components';
import { CardS } from '/src/frames/components/Card';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipPdFormView.scss';

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

    return (
      //
      // 🔳 ClipPdFormView 🔳
      //
      <div
        className={cn(CardS.root(), CardS.color.gray(), 'ClipPdFormView', [
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
            // 🔳 TagsField 🔳
          }
          <Field fieldName="clipPdForm.tags" className={MainFormS.Field()}>
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
            className={MainFormS.Field()}
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
          <div className={cn(MainFormS.Buttons())}>
            <FormCancelButton
              theme="MainView"
              className={cn(MainFormS.Button.root(), MainFormS.Button.gap())}
              tabIndex={10}
              label="Cancel"
            />
            <FormSaveButton
              theme="MainView"
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
