import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { useMessages } from './useMessages';
import { AuthFormL } from '/src/auth/components/AuthCard/AuthForm';
import {
  Field,
  FormSaveButton,
  GlobalError,
  PasswordField,
} from '/src/forms/components';
import { TextField } from '/src/forms/components/TextField';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export const formFields = {
  username: 'username',
  password: 'password',
};

export type PropsT = {
  activateAccount: (username: string, password: string) => any;
  errors: Array<string>;
  className?: any;
};

export function ActivateAccountForm(props: PropsT) {
  const { messages } = useMessages();

  return (
    <FormStateProvider
      initialValues={form.getInitialValues()}
      initialErrors={form.getExternalErrors(messages, props.errors)}
      handleValidate={form.getHandleValidate(messages)}
      handleSubmit={form.getHandleSubmit(props)}
    >
      {
        // 🔳 ActivateAccountForm 🔳
      }
      <div
        className={cn(
          'ActivateAccountForm',
          [],
          [L.col.banner(), props.className]
        )}
      >
        {
          // 🔳 GlobalError 🔳
        }
        <GlobalError className={cn(AuthFormL.GlobalError())} />

        {
          // 🔳 Header 🔳
        }
        <div className={cn(AuthFormL.Header())}>
          {messages.divYouAreOneStepAway}
        </div>

        {
          // 🔳 UsernameField 🔳
        }
        <Field
          fieldName={formFields.username}
          autoFocus={true}
          className={AuthFormL.Field()}
        >
          <TextField placeholder="Username" />
        </Field>

        {
          // 🔳 Password 🔳
        }
        <Field
          fieldName={formFields.password}
          submitOnEnter={true}
          className={AuthFormL.Field()}
        >
          <PasswordField placeholder="Password" />
        </Field>

        {
          // 🔳 Save button 🔳
        }
        <FormSaveButton
          dataCy="activateAccountBtn"
          label="Activate account"
          className={AuthFormL.Button()}
        />
      </div>
    </FormStateProvider>
  );
}
