import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MainFormL } from '/src/dashboard/components/MainView/MainForm';
import {
  Field,
  FormCancelButton,
  FormFieldLabel,
  FormSaveButton,
  GlobalError,
} from '/src/forms/components';
import { EnableDeleteField } from '/src/forms/components/EnableDeleteField';
import { CardL } from '/src/frames/components/Card';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.clip,
  ...dps.clipsDeletion,
  ...dps.clipSettingsEdit,
};

export const ClipSettingsFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      <div
        className={cn(
          'ClipSettingsFormView',
          [],
          [CardL.root(), CardL.color.gray(), props.className]
        )}
      >
        {
          // 🔳 FormStateProvider 🔳
        }
        <FormStateProvider
          initialValues={form.getInitialValues(props)}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
            props,
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props)}
        >
          <GlobalError className={MainFormL.GlobalError()} />
          {
            // 🔳 Delete Clip 🔳
          }
          <Field
            fieldName="clipSettingsForm.isDeletionEnabled"
            className={MainFormL.Field()}
          >
            <FormFieldLabel label="DELETE CLIP" />
            <EnableDeleteField
              deletionWithFlag={props.clipsDeletion}
              msg={deleteClipMsg}
            />
          </Field>
          {
            // 🔳 Buttons 🔳
          }
          <div className={cn(MainFormL.Buttons())}>
            <FormCancelButton
              className={cn(MainFormL.Button.root(), MainFormL.Button.gap())}
              danger={props.clipsDeletion.isDeleteEnabled}
              label="Cancel"
              tabIndex={6}
            />
            <FormSaveButton
              label={props.clipsDeletion.isDeleteEnabled ? 'Delete' : 'Save'}
              danger={props.clipsDeletion.isDeleteEnabled}
              tabIndex={6}
              className={cn(MainFormL.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);

const deleteClipMsg = `This is a destructive action that cannot be undone. It will delete
the clip from all your playlists. Moreover, other people that may be sharing this clip will
no longer be able to see it. To preserve the clip you can use the
"Move to trash" option of the context menu in the clip list in the left sidebar.`;
