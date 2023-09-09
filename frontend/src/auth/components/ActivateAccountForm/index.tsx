import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { useMessages } from './useMessages';
import { AuthFormS } from '/src/auth/components/AuthForm';
import {
  Field,
  FormSaveButton,
  GlobalError,
  PasswordField,
  TextField,
} from '/src/forms/components';
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
        className={cn('ActivateAccountForm', [L.col.banner(), props.className])}
      >
        {
          // 🔳 GlobalError 🔳
        }
        <GlobalError className={cn(AuthFormS.GlobalError())} />

        {
          // 🔳 Header 🔳
        }
        <div className={cn(AuthFormS.Header())}>
          {messages.divYouAreOneStepAway}
        </div>

        {
          // 🔳 Username 🔳
        }
        <Field fieldName={formFields.username} className={AuthFormS.Field()}>
          <TextField autoFocus={true} placeholder="Username" />
        </Field>

        {
          // 🔳 Password 🔳
        }
        <Field
          fieldName={formFields.password}
          submitOnEnter={true}
          className={AuthFormS.Field()}
        >
          <PasswordField placeholder="Password" />
        </Field>

        {
          // 🔳 Save button 🔳
        }
        <FormSaveButton
          theme="AuthCard"
          dataCy="activateAccountBtn"
          label="Activate account"
          className={cn(AuthFormS.Button())}
        />
      </div>
    </FormStateProvider>
  );
}
