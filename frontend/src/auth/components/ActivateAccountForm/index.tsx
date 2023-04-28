import { FormStateProvider } from 'react-form-state-context';
import { Field, GlobalError, SaveButton } from 'src/forms/components';
import { PasswordField } from 'src/forms/components/FormField';
import { colSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import { useMessages } from './useMessages';

export const formFields = {
  password: 'password',
};

export type PropsT = {
  activateAccount: (password: string) => any;
  errors: Array<string>;
  className?: any;
};

export function ActivateAccountForm(props: PropsT) {
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
          'ActivateAccountForm',
          colSkewer,
          'items-stretch',
          props.className
        )}
      >
        <GlobalError className="mb-4" />

        <div>
          {messages.divYouAreOneStepAway}
          <br />
          {messages.divToProceedPleaseChooseANewPassword}
        </div>

        <Field
          fieldName={formFields.password}
          submitOnEnter={true}
          className="my-4"
        >
          <PasswordField placeholder="Password" />
        </Field>

        <SaveButton
          dataCy="activateAccountBtn"
          label="Activate account"
          className={cn('place-self-center', 'my-4')}
        />
      </div>
    </FormStateProvider>
  );
}
