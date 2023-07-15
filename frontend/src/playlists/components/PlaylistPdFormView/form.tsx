import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { DefaultProps, PropsT } from './index';
import { PlaylistPdT } from '/src/api/types/PlaylistPdT';
import { createUUID } from '/src/utils/ids';

const getInitialValues = (props: PropsT & typeof DefaultProps) => {
  return {
    'playlistPdForm.description':
      props.playlist.playlistPd?.description ?? null,
    'playlistPdForm.tags': props.playlist.playlistPd?.tags ?? null,
    'playlistPdForm.id': props.playlist.playlistPd?.id ?? null,
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
    const savePlaylistPd = props.playlistPdEdit.save.bind(props.playlistPdEdit);

    return savePlaylistPd({
      values: unflatten({
        ...values,
        'playlistPdForm.id': values['playlistPdForm.id'] ?? createUUID(),
        'playlistPdForm.tags': values['playlistPdForm.tags'] ?? [],
      }),
    })
      .then((localPlaylistPd: PlaylistPdT) => {
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
    props.playlistPdEdit.cancel();
  };

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
