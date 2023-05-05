import React from 'react';
import { FormStateProvider } from 'react-form-state-context';
import {
  Field,
  FormSaveButton,
  GlobalError,
  PasswordField,
} from 'src/forms/components';
import { getErrorKeys } from 'src/forms/utils/createFormErrorsObject';
import { colBanner } from 'src/frames/components';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import { useMessages } from './useMessages';

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
  const l = L.auth.AuthForm;
  const externalErrors = form.getExternalErrors(messages, props.errors);

  return (
    <FormStateProvider
      initialValues={form.getInitialValues()}
      initialErrors={externalErrors}
      handleValidate={form.getHandleValidate(messages)}
      handleSubmit={form.getHandleSubmit(props)}
    >
      <div
        className={cn(
          //
          'ResetPasswordForm',
          colBanner,
          props.className
        )}
      >
        <GlobalError className={cn(l.GlobalError, '!text-bodyText')} />

        {!getErrorKeys(externalErrors).includes('global') && (
          <React.Fragment>
            <div className={cn(l.Header)}>
              {messages.divEnterYourNewPassword}
            </div>

            <Field
              className={l.Field}
              fieldName={formFields.password}
              submitOnEnter={true}
            >
              <PasswordField placeholder="Password" />
            </Field>
            <FormSaveButton
              dataCy="passwordChangeBtn"
              label="Change password"
              className={l.Button}
            />
          </React.Fragment>
        )}
      </div>
    </FormStateProvider>
  );
}
