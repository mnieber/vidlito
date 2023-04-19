import React from 'react';
import { FormStateProvider } from 'react-form-state-context';
import { EmailField } from 'src/auth/components/formFields/EmailField';
import { PasswordField } from 'src/auth/components/formFields/PasswordField';
import { SubmitButton } from 'src/auth/components/formFields/SubmitButton';
import { ControlledCheckbox, Field, GlobalError } from 'src/forms/components';
import { colSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import { useMessages } from './useMessages';

export const formFields = {
  email: 'email',
  password: 'password',
  useMagicLink: 'useMagicLink',
};

export type PropsT = {
  signIn: (email: string, password: string) => any;
  requestMagicLink: (email: string) => any;
  errors: Array<string>;
  className?: any;
};

export function SignInForm(props: PropsT) {
  const { messages } = useMessages();
  const [useMagicLink, setUseMagicLink] = React.useState(false);

  return (
    <FormStateProvider
      initialValues={form.getInitialValues()}
      initialErrors={form.getExternalErrors(messages, props.errors)}
      handleValidate={form.getHandleValidate(useMagicLink, messages)}
      handleSubmit={form.getHandleSubmit(useMagicLink, props)}
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
          label="Email"
          tabOnEnter={!useMagicLink}
          submitOnEnter={useMagicLink}
          autoFocus={true}
          className="my-4"
        >
          <EmailField />
        </Field>

        <Field
          fieldName="password"
          label="Password"
          submitOnEnter={true}
          className="my-4"
        >
          <PasswordField />
        </Field>

        <Field
          fieldName={formFields.useMagicLink}
          label=""
          className={cn('my-4')}
        >
          <div className={cn('flex flex-row items-center')}>
            <ControlledCheckbox />
            <p className={cn('ml-4')}>{messages.divUseAMagicLink}</p>
          </div>
        </Field>

        <SubmitButton
          dataCy={useMagicLink ? 'sendMagicLinkBtn' : 'signInBtn'}
          label={
            useMagicLink
              ? messages.labelSendMeTheMagicLink
              : messages.labelSignIn
          }
          className={cn('place-self-center', 'my-4')}
        />
      </div>
    </FormStateProvider>
  );
}
