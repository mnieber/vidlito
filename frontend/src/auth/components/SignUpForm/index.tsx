import { FormStateProvider } from 'react-form-state-context';
import {
  ControlledCheckbox,
  EmailField,
  Field,
  FormSaveButton,
  GlobalError,
} from 'src/forms/components';
import { colBanner } from 'src/frames/components';
import { rowSkewer } from 'src/frames/components/Skewer';
import { L } from 'src/frames/layout';
import { cln, cn } from 'src/utils/classnames';
import { form } from './form';
import { useMessages } from './useMessages';

export const formFields = {
  email: 'email',
  acceptsTerms: 'acceptsTerms',
};

export type PropsT = {
  signUp: (email: string, acceptsTerms: boolean) => any;
  errors: Array<string>;
  className?: any;
};

export function SignUpForm(props: PropsT) {
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
        // 🔳 SignUpForm 🔳
      }
      <div
        className={cln(
          'SignInForm',
          props.className
        )(
          //
          colBanner
        )}
      >
        <GlobalError className={l.GlobalError} />

        {
          // 🔳 EmailField 🔳
        }
        <Field
          fieldName={formFields.email}
          autoFocus={true}
          className={l.Field}
        >
          <EmailField placeholder="Email" />
        </Field>

        {
          // 🔳 TermsField 🔳
        }
        <Field fieldName={formFields.acceptsTerms} className={l.Field}>
          <div className={cn('SignUpForm__Terms__', rowSkewer)}>
            <ControlledCheckbox />
            <div className={cn('ml-2')}>{messages.divIAgreeToTheTerms}</div>
          </div>
        </Field>

        {
          // 🔳 FormSaveButton 🔳
        }
        <FormSaveButton
          dataCy="signUpBtn"
          label="Sign Up"
          className={l.Button}
        />
      </div>
    </FormStateProvider>
  );
}
