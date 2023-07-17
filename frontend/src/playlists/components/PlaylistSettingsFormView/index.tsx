import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import {
  Field,
  FormCancelButton,
  FormFieldLabel,
  FormSaveButton,
  GlobalError,
} from '/src/forms/components';
import { L } from '/src/frames/layout';
import { IsPublicPlaylistField } from '/src/playlists/components/IsPublicPlaylistField';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.playlist,
  ...dps.playlistSettingsEdit,
};

export const PlaylistSettingsFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    const l = L.main.MainForm;

    return (
      <div
        className={cn(
          'PlaylistSettingsFormView',
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
          initialValues={form.getInitialValues(props)}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
            props,
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props)}
        >
          <GlobalError className={l.GlobalError()} />
          {
            // 🔳 IsPublicField 🔳
          }
          <Field
            fieldName="playlistSettingsForm.isPublic"
            className={l.Field()}
          >
            <FormFieldLabel label="SETTINGS" />
            <IsPublicPlaylistField />
          </Field>
          {
            // 🔳 Buttons 🔳
          }
          <div className={cn(l.Buttons())}>
            <FormCancelButton
              className={cn(l.Button.root(), l.Button.gap())}
              label="Cancel"
              tabIndex={6}
            />
            <FormSaveButton
              label="Save"
              tabIndex={6}
              className={cn(l.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
