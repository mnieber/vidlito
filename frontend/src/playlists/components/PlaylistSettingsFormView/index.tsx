import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MainFormL } from '/src/dashboard/components/MainView/MainForm';
import {
  Field,
  FormCancelButton,
  FormFieldLabel,
  FormSaveButton,
  GlobalError,
} from '/src/forms/components';
import { FormFieldL } from '/src/forms/components/FormField';
import { CardL } from '/src/frames/components/Card';
import { Toggle } from '/src/frames/components/Toggle';
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
    const [isDeleteEnabled, setIsDeleteEnabled] = React.useState(false);

    return (
      <div
        className={cn(
          'PlaylistSettingsFormView',
          [],
          [CardL.root(), CardL.color.gray(), props.className]
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
          <GlobalError className={MainFormL.GlobalError()} />
          {
            // 🔳 IsPublicField 🔳
          }
          <Field
            fieldName="playlistSettingsForm.isPublic"
            className={MainFormL.Field()}
          >
            <FormFieldLabel label="SETTINGS" />
            <IsPublicPlaylistField />
          </Field>
          {
            // 🔳 Delete Playlist 🔳
          }
          <Field
            fieldName="playlistSettingsForm.isDeletionEnabled"
            className={MainFormL.Field()}
          >
            <FormFieldLabel label="DELETE PLAYLIST" />
            <div
              className={cn(
                'PlaylistSettingsForm__EnableDeleteFormField',
                FormFieldL.root(),
                FormFieldL.input()
              )}
            >
              <Toggle
                className="mt-1 h-6 w-10"
                id="enableDeletePlaylist"
                onChange={(e: any) => {
                  setIsDeleteEnabled(e.target.checked);
                }}
                isChecked={isDeleteEnabled}
              />
            </div>
          </Field>
          {
            // 🔳 Buttons 🔳
          }
          <div className={cn(MainFormL.Buttons())}>
            <FormCancelButton
              className={cn(MainFormL.Button.root(), MainFormL.Button.gap())}
              danger={isDeleteEnabled}
              label="Cancel"
              tabIndex={6}
            />
            <FormSaveButton
              label={isDeleteEnabled ? 'Delete' : 'Save'}
              danger={isDeleteEnabled}
              tabIndex={6}
              className={cn(MainFormL.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
