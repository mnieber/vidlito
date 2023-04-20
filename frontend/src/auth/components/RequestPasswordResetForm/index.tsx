import { FormStateProvider } from 'react-form-state-context';
import { authCard } from 'src/auth/components/AuthCard';
import { EmailField } from 'src/auth/components/formFields/EmailField';
import { SubmitButton } from 'src/auth/components/formFields/SubmitButton';
import { Field, GlobalError } from 'src/forms/components';
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

        <div className={cn(authCard.form.stackOnMessage)}>
          {messages.divEnterYourEmailToResetYourPassword}
        </div>

        <Field fieldName={formFields.email} submitOnEnter={true}>
          <EmailField />
        </Field>

        <SubmitButton
          dataCy="passwordResetBtn"
          label="Request password reset"
          className={cn(authCard.submitButton.container)}
        />
      </div>
    </FormStateProvider>
  );
}
