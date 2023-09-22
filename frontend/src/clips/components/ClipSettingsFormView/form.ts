import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
} from 'react-form-state-context';
import { type NavContext } from 'react-nav-handler';
import { DefaultProps, PropsT } from './index';
import { toClip } from '/src/clips/navFunctions';

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
    navContext: NavContext,
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
        .then(() => {
          navContext.nav(toClip)(
            props.playlist.ownerUsername,
            props.playlist.slug,
            props.clipsHighlight.item?.slug ?? '-'
          );
        })
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
