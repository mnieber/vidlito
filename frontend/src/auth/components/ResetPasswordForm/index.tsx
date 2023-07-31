import React from 'react';
import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { useMessages } from './useMessages';
import { AuthFormL } from '/src/auth/components/AuthCard/AuthForm';
import {
  Field,
  FormSaveButton,
  GlobalError,
  PasswordField,
} from '/src/forms/components';
import { getErrorKeys } from '/src/forms/utils/createFormErrorsObject';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export const formFields = {
  password: 'password',
};

export type PropsT = {
  resetPassword: (password: string) => any;
  errors: Array<string>;
  className?: any;
};

export function ResetPasswordForm(props: PropsT) {
  const { messages } = useMessages();
  const externalErrors = form.getExternalErrors(messages, props.errors);

  return (
    <FormStateProvider
      initialValues={form.getInitialValues()}
      initialErrors={externalErrors}
      handleValidate={form.getHandleValidate(messages)}
      handleSubmit={form.getHandleSubmit(props)}
    >
      {
        // 🔳 Form 🔳
      }
      <div
        className={cn('ResetPasswordForm', [L.col.banner(), props.className])}
      >
        {
          // 🔳 Global error 🔳
        }
        <GlobalError className={AuthFormL.GlobalError()} />

        {!getErrorKeys(externalErrors).includes('global') && (
          <React.Fragment>
            {
              // 🔳 Enter your password message 🔳
            }
            <div className={AuthFormL.Header()}>
              {messages.divEnterYourNewPassword}
            </div>

            {
              // 🔳 Password field 🔳
            }
            <Field
              className={AuthFormL.Field()}
              fieldName={formFields.password}
              submitOnEnter={true}
            >
              <PasswordField placeholder="Password" />
            </Field>

            {
              // 🔳 Save button 🔳
            }
            <FormSaveButton
              dataCy="passwordChangeBtn"
              label="Change password"
              className={AuthFormL.Button()}
            />
          </React.Fragment>
        )}
      </div>
    </FormStateProvider>
  );
}
