import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { withContextProps } from 'react-props-from-context';
import { form } from './form';
import { IsPublicClipField } from '/src/clips/components/ClipSettingsFormView/IsPublicClipField';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { MainFormS } from '/src/dashboard/components/MainForm';
import {
  Field,
  FormCancelButton,
  FormFieldLabel,
  FormSaveButton,
  GlobalError,
} from '/src/forms/components';
import { EnableDeleteField } from '/src/forms/components/EnableDeleteField';
import { CardS } from '/src/frames/components/Card';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipSettingsFormView.scss';

export type PropsT = {
  className?: any;
};

export const ContextProps = {
  clip: clipsCtx.clip,
  playlist: playlistsCtx.playlist,
  clipsDeletion: clipsCtx.clipsDeletion,
  clipsHighlight: clipsCtx.clipsHighlight,
  clipSettingsEdit: clipsCtx.clipSettingsEdit,
};

export const ClipSettingsFormView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      <div
        className={cn(
          CardS.root(),
          CardS.color.gray(),
          'ClipSettingsFormView',
          [props.className]
        )}
      >
        {
          // 🔳 FormStateProvider 🔳
        }
        <FormStateProvider
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
            // 🔳 Global error 🔳
          }
          <GlobalError className={MainFormS.GlobalError()} />
          {
            // 🔳 IsPublicField 🔳
          }
          <Field
            fieldName="clipSettingsForm.isPublic"
            className={MainFormS.Field()}
          >
            <FormFieldLabel label="SETTINGS" />
            <IsPublicClipField clip={props.clip} playlist={props.playlist} />
          </Field>
          {
            // 🔳 Delete Clip 🔳
          }
          <Field
            fieldName="clipSettingsForm.isDeletionEnabled"
            className={MainFormS.Field()}
          >
            <FormFieldLabel label="DELETE CLIP" />
            <EnableDeleteField
              deletionWithFlag={props.clipsDeletion}
              msg={
                props.clip.nrOfPublicPlaylists
                  ? deletePublicClipMsg
                  : deletePrivateClipMsg
              }
            />
          </Field>
          {
            // 🔳 Buttons 🔳
          }
          <div className={cn(MainFormS.Buttons())}>
            <FormCancelButton
              theme="MainView"
              className={cn(MainFormS.Button.root(), MainFormS.Button.gap())}
              danger={props.clipsDeletion.isDeleteEnabled}
              label="Cancel"
              tabIndex={6}
            />
            <FormSaveButton
              theme="MainView"
              label={props.clipsDeletion.isDeleteEnabled ? 'Delete' : 'Save'}
              danger={props.clipsDeletion.isDeleteEnabled}
              tabIndex={6}
              className={cn(MainFormS.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, ContextProps)
);

const deletePublicClipMsg = `This is a destructive action that deletes
the clip (from all your playlists) for you and other users.
To preserve the clip you can use the "Move to trash" option of the context menu in the clip list in the left sidebar.`;

const deletePrivateClipMsg = `This is a destructive action that deletes the clip from all your playlists.
To preserve the clip you can use the "Move to trash" option of the context menu in the clip list in the left sidebar.`;
