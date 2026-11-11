import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
} from 'react-form-state-context';
import { type NavContext } from 'react-nav-handler';
import { ContextProps, PropsT } from './index';
import { toClip } from '/src/clips/navFunctions';

const getInitialValues = (props: PropsT & typeof ContextProps) => {
  return {
    'clipSettingsForm.clipId': props.clip.id ?? null,
    'clipSettingsForm.isDeletionEnabled': props.clipsDeletion.isDeleteEnabled,
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
    navContext: NavContext,
    props: PropsT & typeof ContextProps,
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
          props.clipsDeletion.setIsDeleteEnabled(false);
          props.clipSettingsEdit.cancel();
        })
        .then(() => {
          navContext.nav(toClip)(
            props.playlist.ownerUsername,
            props.playlist.slug,
            props.clipsHighlight.item?.slug ?? '-'
          );
        });
    }
    return Promise.resolve();
  };

const getHandleCancel =
  (props: PropsT & typeof ContextProps) =>
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
