import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { useMessages } from './useMessages';
import { AuthFormS } from '/src/auth/components/AuthForm';
import {
  EmailField,
  Field,
  FormSaveButton,
  GlobalError,
} from '/src/forms/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export const formFields = {
  email: 'email',
};

export type PropsT = {
  requestPasswordReset: (email: string) => any;
  errors: Array<string>;
  className?: any;
};

export function RequestPasswordResetForm(props: PropsT) {
  const { messages } = useMessages();

  return (
    <FormStateProvider
      initialValues={form.getInitialValues()}
      initialErrors={form.getExternalErrors(messages, props.errors)}
      handleValidate={form.getHandleValidate(messages)}
      handleSubmit={form.getHandleSubmit(props)}
    >
      {
        // 🔳 Form 🔳
      }
      <div
        className={cn('RequestPasswordResetForm', [
          L.col.banner(),
          props.className,
        ])}
      >
        {
          // 🔳 Global error 🔳
        }
        <GlobalError className={AuthFormS.GlobalError()} />

        {
          // 🔳 Message 🔳
        }
        <div className={AuthFormS.Header()}>
          {messages.divEnterYourEmailToResetYourPassword}
        </div>

        {
          // 🔳 Email field 🔳
        }
        <Field
          fieldName={formFields.email}
          submitOnEnter={true}
          className={AuthFormS.Field()}
        >
          <EmailField placeholder="Email" />
        </Field>

        {
          // 🔳 Save button 🔳
        }
        <FormSaveButton
          theme="AuthCard"
          dataCy="passwordResetBtn"
          label="Request password reset"
          className={cn(AuthFormS.Button())}
        />
      </div>
    </FormStateProvider>
  );
}
