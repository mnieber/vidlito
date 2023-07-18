import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { useMessages } from './useMessages';
import {
  EmailField,
  Field,
  FormSaveButton,
  GlobalError,
} from '/src/forms/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export const formFields = {
  email: 'email',
};

export type PropsT = {
  requestMagicLink: (email: string) => any;
  errors: Array<string>;
  className?: any;
};

export function RequestMagicLinkForm(props: PropsT) {
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
        // 🔳 Form 🔳
      }
      <div
        className={cn(
          'RequestMagicLinkForm',
          //
          //
          L.col.banner(),
          props.className
        )}
      >
        {
          // 🔳 Global error 🔳
        }
        <GlobalError className={l.GlobalError()} />

        {
          // 🔳 Reset password message 🔳
        }
        <div className={cn(l.Header())}>
          {messages.divEnterYourEmailToResetYourPassword}
        </div>

        {
          // 🔳 Email field 🔳
        }
        <Field
          fieldName={formFields.email}
          submitOnEnter={true}
          className={l.Field()}
        >
          <EmailField placeholder="Email" />
        </Field>

        {
          // 🔳 Save button 🔳
        }
        <FormSaveButton
          dataCy="magicLinkBtn"
          label="Request Magic Link"
          className={l.Button()}
        />
      </div>
    </FormStateProvider>
  );
}
