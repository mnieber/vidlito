import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { ContextProps, PropsT } from './index';
import { ObjT } from '/src/utils/types';

const getInitialValues = (props: PropsT & typeof ContextProps) => {
  return {
    'playlistSettingsForm.playlistId': props.playlist.id ?? null,
    'playlistSettingsForm.isPublic': props.playlist.isPublic ?? null,
    'playlistSettingsForm.isDeletionEnabled': false,
  };
};

const getInitialErrors = (props: PropsT & typeof ContextProps) => {
  return {};
};

const getHandleValidate =
  (props: PropsT & typeof ContextProps) =>
  ({ values, setError }: HandleValidateArgsT) => {};

const getHandleSubmit =
  (
    props: PropsT & typeof ContextProps,
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
      .then((response: ObjT) => {
        formState.reset(initialValues, initialErrors);
        return response;
      })
      .then(() => {
        props.playlistsDeletion.setIsDeleteEnabled(false);
        props.playlistSettingsEdit.cancel();
      })
      .catch((error: any) => {
        formState.setError(
          'global',
          'Oops, something went wrong, please try again later'
        );
      });
  };

const getHandleCancel =
  (props: PropsT & typeof ContextProps) =>
  ({ formState }: HandleCancelArgsT) => {
    props.playlistsDeletion.setIsDeleteEnabled(false);
    props.playlistSettingsEdit.cancel();
  };

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
