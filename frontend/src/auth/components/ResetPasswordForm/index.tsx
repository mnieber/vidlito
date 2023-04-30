import { FormStateProvider } from 'react-form-state-context';
import {
  Field,
  GlobalError,
  PasswordField,
  SaveButton,
} from 'src/forms/components';
import { colBanner } from 'src/frames/components';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import { useMessages } from './useMessages';

export const formFields = {
  password: 'password',
};

export type PropsT = {
  resetPassword: (password: string) => any;
  errors: Array<string>;
  className?: any;
};

export function ResetPasswordForm(props: PropsT) {
  const { messages } = useMessages();
  const l = L.auth.AuthForm;

  return (
    <FormStateProvider
      initialValues={form.getInitialValues()}
      initialErrors={form.getExternalErrors(messages, props.errors)}
      handleValidate={form.getHandleValidate(messages)}
      handleSubmit={form.getHandleSubmit(props)}
    >
      <div
        className={cn(
          //
          'ResetPasswordForm',
          colBanner,
          props.className
        )}
      >
        <GlobalError className={l.GlobalError} />
        <Field
          className={l.Field}
          fieldName={formFields.password}
          submitOnEnter={true}
        >
          <PasswordField placeholder="Password" />
        </Field>
        <SaveButton
          dataCy="passwordChangeBtn"
          label="Change password"
          className={l.Button}
        />
      </div>
    </FormStateProvider>
  );
}
