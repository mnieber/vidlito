import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
} from 'react-form-state-context';
import { ContextProps, PropsT } from './index';
import { dashboardNav } from '/src/dashboard/routes';
import { navTo } from '/src/routes/navHandler';

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
          navTo(
            dashboardNav.clip({
              ownerUsername: props.playlist.ownerUsername,
              playlistSlug: props.playlist.slug,
              clipSlug: props.clipsHighlight.item?.slug ?? '-',
            })
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
