import { FormStateProvider } from 'react-form-state-context';
import {
  EmailField,
  Field,
  FormSaveButton,
  GlobalError,
  PasswordField,
} from 'src/forms/components';
import { L } from 'src/frames/layout';
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
  const l = L.auth.AuthForm;

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
      <div
        className={cn(
          'SignInForm',
          //
          //
          L.col.banner(),
          props.className
        )}
      >
        <GlobalError className={l.GlobalError()} />

        {
          // 🔳 EmailField 🔳
        }
        <Field
          className={l.Field()}
          fieldName={formFields.email}
          tabOnEnter={true}
          autoFocus={true}
        >
          <EmailField placeholder="Email" />
        </Field>

        {
          // 🔳 PasswordField 🔳
        }
        <Field className={l.Field()} fieldName="password" submitOnEnter={true}>
          <PasswordField placeholder="Password" />
        </Field>

        {
          // 🔳 FormSaveButton 🔳
        }
        <FormSaveButton
          dataCy={'signInBtn'}
          label={messages.labelSignIn}
          className={l.Button()}
        />
      </div>
    </FormStateProvider>
  );
}
