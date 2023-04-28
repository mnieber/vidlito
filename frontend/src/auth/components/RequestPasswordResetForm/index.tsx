import { FormStateProvider } from 'react-form-state-context';
import { AuthCard_ } from 'src/auth/components/AuthCard';
import { Field, GlobalError, SaveButton } from 'src/forms/components';
import { EmailField } from 'src/forms/components/FormField';
import { colBanner } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import { useMessages } from './useMessages';

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
      <div
        className={cn('RequestPasswordResetForm', colBanner, props.className)}
      >
        <GlobalError />

        <div className={cn(AuthCard_.form.stackOnMessage)}>
          {messages.divEnterYourEmailToResetYourPassword}
        </div>

        <Field
          fieldName={formFields.email}
          submitOnEnter={true}
          className={AuthCard_.fieldStack}
        >
          <EmailField placeholder="Email" />
        </Field>

        <SaveButton dataCy="passwordResetBtn" label="Request password reset" />
      </div>
    </FormStateProvider>
  );
}
