import { FormStateProvider } from 'react-form-state-context';
import { authCard } from 'src/auth/components/AuthCard';
import { EmailField } from 'src/auth/components/formFields/EmailField';
import { PasswordField } from 'src/auth/components/formFields/PasswordField';
import { SubmitButton } from 'src/auth/components/formFields/SubmitButton';
import { Field, GlobalError } from 'src/forms/components';
import { colSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import { useMessages } from './useMessages';

export const formFields = {
  email: 'email',
  password: 'password',
};

export type PropsT = {
  signIn: (email: string, password: string) => any;
  errors: Array<string>;
  className?: any;
};

export function SignInForm(props: PropsT) {
  const { messages } = useMessages();

  return (
    <FormStateProvider
      initialValues={form.getInitialValues()}
      initialErrors={form.getExternalErrors(messages, props.errors)}
      handleValidate={form.getHandleValidate(messages)}
      handleSubmit={form.getHandleSubmit(props)}
    >
      <div
        className={cn(
          'SignInForm',
          colSkewer,
          'items-stretch',
          props.className
        )}
      >
        <GlobalError className="mb-2" />

        <Field
          fieldName={formFields.email}
          tabOnEnter={true}
          autoFocus={true}
          className=""
        >
          <EmailField />
        </Field>

        <Field fieldName="password" submitOnEnter={true} className="">
          <PasswordField />
        </Field>

        <SubmitButton
          dataCy={'signInBtn'}
          label={messages.labelSignIn}
          className={cn(authCard.submitButton.container)}
        />
      </div>
    </FormStateProvider>
  );
}
