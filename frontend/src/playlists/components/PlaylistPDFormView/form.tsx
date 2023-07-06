import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { DefaultProps, PropsT } from './index';
import { PlaylistPDT } from '/src/api/types/PlaylistPDT';
import { createUUID } from '/src/utils/ids';

const getInitialValues = (props: PropsT & typeof DefaultProps) => {
  return {
    'playlistPDForm.description': props.playlistPD.description ?? null,
    'playlistPDForm.tags': props.playlistPD.tags ?? null,
    'playlistPDForm.id': props.playlistPD.id ?? createUUID(),
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
    const savePlaylistPD = props.playlistPDEdit.save.bind(props.playlistPDEdit);

    return savePlaylistPD({
      values: unflatten({
        ...values,
        'playlistPDForm.tags': values['playlistPDForm.tags'] ?? [],
      }),
    })
      .then((localPlaylistPD: PlaylistPDT) => {
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
    props.playlistPDEdit.cancel();
  };

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
