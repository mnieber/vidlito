import { FormStateProvider } from 'react-form-state-context';
import { AuthCard_ } from 'src/auth/components/AuthCard';
import {
  ControlledCheckbox,
  Field,
  GlobalError,
  SaveButton,
} from 'src/forms/components';
import { EmailField } from 'src/forms/components/FormField';
import { colBanner, rowBanner } from 'src/frames/components';
import { cln, cn } from 'src/utils/classnames';
import './SignUpForm.scss';
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
        <GlobalError />

        {
          // 🔳 EmailField 🔳
        }
        <Field fieldName={formFields.email} autoFocus={true}>
          <EmailField placeholder="Email" className={cn(AuthCard_.formField)} />
        </Field>

        {
          // 🔳 TermsField 🔳
        }
        <Field fieldName={formFields.acceptsTerms}>
          <div className={cn('SignUpForm__Terms__', rowBanner)}>
            <ControlledCheckbox />
            <div className={cn('ml-2')}>{messages.divIAgreeToTheTerms}</div>
          </div>
        </Field>

        {
          // 🔳 SaveButton 🔳
        }
        <SaveButton dataCy="signUpBtn" label="Sign Up" className={cn('my-4')} />
      </div>
    </FormStateProvider>
  );
}
