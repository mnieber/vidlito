import { FormStateProvider } from 'react-form-state-context';
import {
  EmailField,
  Field,
  FormSaveButton,
  GlobalError,
} from 'src/forms/components';
import { colBanner } from 'src/frames/components';
import { L } from 'src/frames/layout';
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
  const l = L.auth.AuthForm;

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
        <GlobalError className={l.GlobalError} />

        <div className={cn(l.Header)}>
          {messages.divEnterYourEmailToResetYourPassword}
        </div>

        <Field
          fieldName={formFields.email}
          submitOnEnter={true}
          className={l.Field}
        >
          <EmailField placeholder="Email" />
        </Field>

        <FormSaveButton
          dataCy="passwordResetBtn"
          label="Request password reset"
          className={l.Button}
        />
      </div>
    </FormStateProvider>
  );
}
