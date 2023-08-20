import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { dps, withDefaultProps } from '/src/app/defaultProps';
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
  ...dps.playlistsDeletion,
};

export const PlaylistSettingsFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);
    const nrOfClipsThatWillBeDeleted = props.playlist.clipSet.filter(
      (clip) => clip.nrOfPublicPlaylists + clip.nrOfPrivatePlaylists === 1
    ).length;

    return (
      <div
        className={cn(
          CardS.root(),
          CardS.color.gray(),
          'PlaylistSettingsFormView',
          [props.className]
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
          <GlobalError className={MainFormS.GlobalError()} />
          {
            // 🔳 IsPublicField 🔳
          }
          <Field
            fieldName="playlistSettingsForm.isPublic"
            className={MainFormS.Field()}
          >
            <FormFieldLabel label="SETTINGS" />
            <IsPublicPlaylistField />
          </Field>
          {
            // 🔳 Delete Playlist 🔳
          }
          <Field
            fieldName="playlistSettingsForm.isDeletionEnabled"
            className={MainFormS.Field()}
          >
            <FormFieldLabel label="DELETE PLAYLIST" />
            <EnableDeleteField
              deletionWithFlag={props.playlistsDeletion}
              msg={
                props.playlist.nrOfClips === 0
                  ? deleteEmptyPlaylistMsg
                  : nrOfClipsThatWillBeDeleted === 0
                  ? deletePlaylistMsg
                  : deletePlaylistAndClipsMsg
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
              danger={props.playlistsDeletion.isDeleteEnabled}
              label="Cancel"
              tabIndex={6}
            />
            <FormSaveButton
              theme="MainView"
              label={
                props.playlistsDeletion.isDeleteEnabled ? 'Delete' : 'Save'
              }
              danger={props.playlistsDeletion.isDeleteEnabled}
              tabIndex={6}
              className={cn(MainFormS.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);

const deletePlaylistAndClipsMsg = `When you delete this playlist, then all clips that are not contained in
one of your other playlists will be deleted as well. The affected clips are shown with a dot behind
their name in the clip list in the left sidebar.`;

const deletePlaylistMsg = `The clips on this playlist also exist on your other playlists. Therefore,
when you delete this playlist, no clips will be deleted along with it.`;

const deleteEmptyPlaylistMsg = `This playlist has no clips. Therefore, when you delete this playlist,
no clips will be deleted along with it.`;
