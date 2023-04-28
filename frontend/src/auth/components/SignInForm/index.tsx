import { FormStateProvider } from 'react-form-state-context';
import { AuthCard_ } from 'src/auth/components/AuthCard';
import { Field, GlobalError, SaveButton } from 'src/forms/components';
import { EmailField, PasswordField } from 'src/forms/components/FormField';
import { colBanner } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import './index.scss';
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
    //
    // 🔳 FormStateProvider 🔳
    //
    <FormStateProvider
      initialValues={form.getInitialValues()}
      initialErrors={form.getExternalErrors(messages, props.errors)}
      handleValidate={form.getHandleValidate(messages)}
      handleSubmit={form.getHandleSubmit(props)}
    >
      {
        // 🔳 SignInForm 🔳
      }
      <div className={cn('SignInForm', colBanner, props.className)}>
        <GlobalError className="mb-2" />

        {
          // 🔳 EmailField 🔳
        }
        <Field fieldName={formFields.email} tabOnEnter={true} autoFocus={true}>
          <EmailField placeholder="Email" className={cn(AuthCard_.formField)} />
        </Field>

        {
          // 🔳 PasswordField 🔳
        }
        <Field fieldName="password" submitOnEnter={true}>
          <PasswordField
            placeholder="Password"
            className={cn(AuthCard_.formField)}
          />
        </Field>

        {
          // 🔳 SaveButton 🔳
        }
        <SaveButton dataCy={'signInBtn'} label={messages.labelSignIn} />
      </div>
    </FormStateProvider>
  );
}
