import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { useMessages } from './useMessages';
import { AllauthFieldErrorsT } from '/src/api/utils/allauth';
import { AuthFormS } from '/src/auth/components/AuthForm';
import { FormSaveButton, GlobalError } from '/src/forms/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  verifyEmail: () => any;
  errors: Array<string>;
  fieldErrors?: AllauthFieldErrorsT;
  className?: any;
};

export function VerifyEmailForm(props: PropsT) {
  const { messages } = useMessages();

  return (
    <FormStateProvider
      initialValues={form.getInitialValues()}
      initialErrors={form.getExternalErrors(
        messages,
        props.errors,
        props.fieldErrors
      )}
      handleValidate={form.getHandleValidate()}
      handleSubmit={form.getHandleSubmit(props)}
    >
      {
        // 🔳 VerifyEmailForm 🔳
      }
      <div className={cn('VerifyEmailForm', [L.col.banner(), props.className])}>
        {
          // 🔳 GlobalError 🔳
        }
        <GlobalError className={cn(AuthFormS.GlobalError())} />

        {
          // 🔳 Header 🔳
        }
        <div className={cn(AuthFormS.Header())}>
          {messages.divConfirmYourEmailAddress}
        </div>

        {
          // 🔳 Save button 🔳
        }
        <FormSaveButton
          theme="AuthCard"
          dataCy="verifyEmailBtn"
          label="Verify email address"
          className={cn(AuthFormS.Button())}
        />
      </div>
    </FormStateProvider>
  );
}
