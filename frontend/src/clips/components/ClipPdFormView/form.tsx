import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { DefaultProps, PropsT } from './index';
import { ClipPdT } from '/src/api/types/ClipPdT';
import { createUUID } from '/src/utils/ids';

const getInitialValues = (props: PropsT & typeof DefaultProps) => {
  return {
    'clipPdForm.description': props.clipPd.description ?? null,
    'clipPdForm.tags': props.clipPd.tags ?? null,
    'clipPdForm.id': props.clipPd.id ?? null,
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
    const saveClipPd = props.clipPdEdit.save.bind(props.clipPdEdit);

    return saveClipPd({
      values: unflatten({
        ...values,
        'clipPdForm.id': values['clipPdForm.id'] ?? createUUID(),
        'clipPdForm.tags': values['clipPdForm.tags'] ?? [],
      }),
    })
      .then((localClipPd: ClipPdT) => {
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
    props.clipPdEdit.cancel();
  };

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
