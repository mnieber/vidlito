import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { DefaultProps, PropsT } from './index';
import { PlaylistT } from '/src/api/types/PlaylistT';

const getInitialValues = (props: PropsT & typeof DefaultProps) => {
  return {
    'playlistSettingsForm.playlistId': props.playlist.id ?? null,
    'playlistSettingsForm.isPublic': props.playlist.isPublic ?? null,
    'playlistSettingsForm.isDeletionEnabled': false,
  };
};

const getInitialErrors = (props: PropsT & typeof DefaultProps) => {
  return {};
};

const getHandleValidate =
  (props: PropsT & typeof DefaultProps) =>
  ({ values, setError }: HandleValidateArgsT) => {};

const getHandleSubmit =
  (
    props: PropsT & typeof DefaultProps,
    initialValues: FormState['values'],
    initialErrors: FormState['errors']
  ) =>
  ({ formState, values }: HandleSubmitArgsT) => {
    if (values['playlistSettingsForm.isDeletionEnabled']) {
      return props.playlistsDeletion.delete({
        itemIds: [props.playlist.id],
        moveToTrash: false,
      });
    }

    return props.playlistSettingsEdit
      .save({
        values: unflatten({
          ...values,
          'playlistSettingsForm.isDeletionEnabled': undefined,
        }),
      })
      .then((localPlaylist: PlaylistT) => {
        formState.reset(initialValues, initialErrors);
      })
      .catch((error: any) => {
        formState.setError(
          'global',
          'Oops, something went wrong, please try again later'
        );
      });
  };

const getHandleCancel =
  (props: PropsT & typeof DefaultProps) =>
  ({ formState }: HandleCancelArgsT) => {
    props.playlistSettingsEdit.cancel();
  };

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
