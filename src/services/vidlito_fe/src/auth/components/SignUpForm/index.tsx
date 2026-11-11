import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { useMessages } from './useMessages';
import { AllauthFieldErrorsT } from '/src/api/utils/allauth';
import { AuthFormS } from '/src/auth/components/AuthForm';
import {
  ControlledCheckbox,
  EmailField,
  Field,
  FormSaveButton,
  GlobalError,
  PasswordField,
  TextField,
} from '/src/forms/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export const formFields = {
  email: 'email',
  username: 'username',
  password: 'password',
  acceptsTerms: 'acceptsTerms',
};

export type PropsT = {
  signUp: (
    email: string,
    username: string,
    password: string,
    acceptsTerms: boolean
  ) => any;
  errors: Array<string>;
  fieldErrors?: AllauthFieldErrorsT;
  className?: any;
};

export function SignUpForm(props: PropsT) {
  const { messages } = useMessages();

  return (
    <FormStateProvider
      initialValues={form.getInitialValues()}
      initialErrors={form.getExternalErrors(
        messages,
        props.errors,
        props.fieldErrors
      )}
      handleValidate={form.getHandleValidate(messages)}
      handleSubmit={form.getHandleSubmit(props)}
    >
      {
        // 🔳 SignUpForm 🔳
      }
      <div className={cn('SignInForm', [L.col.banner(), props.className])}>
        {
          // 🔳 Global error 🔳
        }
        <GlobalError className={AuthFormS.GlobalError()} />

        {
          // 🔳 EmailField 🔳
        }
        <Field fieldName={formFields.email} className={AuthFormS.Field()}>
          <EmailField autoFocus={true} placeholder="Email" />
        </Field>

        {
          // 🔳 UsernameField 🔳
        }
        <Field fieldName={formFields.username} className={AuthFormS.Field()}>
          <TextField placeholder="Username" />
        </Field>

        {
          // 🔳 PasswordField 🔳
        }
        <Field fieldName={formFields.password} className={AuthFormS.Field()}>
          <PasswordField placeholder="Password" />
        </Field>

        {
          // 🔳 TermsField 🔳
        }
        <Field
          fieldName={formFields.acceptsTerms}
          className={AuthFormS.Field()}
        >
          <div className={cn('SignUpForm__Terms', [L.row.skewer()])}>
            <ControlledCheckbox />
            <div className={cn('ml-2')}>{messages.divIAgreeToTheTerms}</div>
          </div>
        </Field>

        {
          // 🔳 FormSaveButton 🔳
        }
        <FormSaveButton
          theme="AuthCard"
          dataCy="signUpBtn"
          label="Sign Up"
          className={cn(AuthFormS.Button())}
        />
      </div>
    </FormStateProvider>
  );
}
