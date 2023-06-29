import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { withDefaultProps } from '/src/app/defaultProps';
import {
  Field,
  FormFieldLabel,
  GlobalError,
  TextField,
} from '/src/forms/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {};

export const SearchFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const formStateRef = React.useRef<FormState>(null);

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    const l = L.main.MainForm;

    return (
      //
      // 🔳 SearchFormView 🔳
      //
      <div
        className={cn(
          'SearchFormView',
          //
          //
          l.root(),
          props.className
        )}
      >
        {
          // 🔳 FormStateProvider 🔳
        }
        <FormStateProvider
          formStateRef={formStateRef}
          initialValues={initialValues}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
            props,
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props)}
        >
          {
            // 🔳 UrlField 🔳
          }
          <GlobalError className={l.GlobalError()} />
          <Field
            fieldName="searchForm.playlist"
            autoFocus={true}
            className={l.Field()}
          >
            <FormFieldLabel label="Playlist" />
            <TextField tabIndex={1} controlled={true} autoSelect={true} />
          </Field>
          <Field fieldName="searchForm.clip" className={l.Field()}>
            <FormFieldLabel label="Clip" />
            <TextField tabIndex={2} controlled={true} />
          </Field>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
