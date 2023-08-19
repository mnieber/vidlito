import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
} from 'react-form-state-context';
import { DefaultProps, PropsT } from './index';
import { handleEmptyClips } from '/src/clips/handleEmptyClips';

const getInitialValues = (props: PropsT & typeof DefaultProps) => {
  return {
    'clipSettingsForm.clipId': props.clip.id ?? null,
    'clipSettingsForm.isDeletionEnabled': props.clipsDeletion.isDeleteEnabled,
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
    if (values['clipSettingsForm.isDeletionEnabled']) {
      return props.clipsDeletion
        .delete({
          itemIds: [props.clip.id],
          moveToTrash: false,
        })
        .then(handleEmptyClips(props.clipsHighlight, props.playlist))
        .then(() => {
          props.clipSettingsEdit.cancel();
        });
    }
    return Promise.resolve();
  };

const getHandleCancel =
  (props: PropsT & typeof DefaultProps) =>
  ({ formState }: HandleCancelArgsT) => {
    props.clipsDeletion.setIsDeleteEnabled(false);
    props.clipSettingsEdit.cancel();
  };

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
