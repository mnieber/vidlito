import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { ContextProps, PropsT } from './index';
import { createUUID } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

const getInitialValues = (props: PropsT & typeof ContextProps) => {
  return {
    'playlistPdForm.description':
      props.playlist.playlistPd?.description ?? null,
    'playlistPdForm.tags': props.playlist.playlistPd?.tags ?? null,
    'playlistPdForm.id': props.playlist.playlistPd?.id ?? null,
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
    return props.playlistPdEdit
      .save({
        values: unflatten({
          ...values,
          'playlistPdForm.id': values['playlistPdForm.id'] ?? createUUID(),
          'playlistPdForm.tags': values['playlistPdForm.tags'] ?? [],
        }),
      })
      .then((response: ObjT) => {
        formState.reset(initialValues, initialErrors);
        return response;
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
    props.playlistPdEdit.cancel();
  };

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
