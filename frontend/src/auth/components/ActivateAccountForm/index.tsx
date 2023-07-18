import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { useMessages } from './useMessages';
import {
  Field,
  FormSaveButton,
  GlobalError,
  PasswordField,
} from '/src/forms/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export const formFields = {
  password: 'password',
};

export type PropsT = {
  activateAccount: (password: string) => any;
  errors: Array<string>;
  className?: any;
};

export function ActivateAccountForm(props: PropsT) {
  const { messages } = useMessages();

  const l = L.auth.AuthForm;

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
        <GlobalError className={cn(l.GlobalError())} />

        {
          // 🔳 Header 🔳
        }
        <div className={cn(l.Header())}>{messages.divYouAreOneStepAway}</div>

        {
          // 🔳 Password 🔳
        }
        <Field
          fieldName={formFields.password}
          submitOnEnter={true}
          className={l.Field()}
        >
          <PasswordField placeholder="Password" />
        </Field>

        {
          // 🔳 Save button 🔳
        }
        <FormSaveButton
          dataCy="activateAccountBtn"
          label="Activate account"
          className={l.Button()}
        />
      </div>
    </FormStateProvider>
  );
}
