import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { DefaultProps, PropsT } from './index';
import { ClipPDT } from '/src/api/types/ClipPDT';
import { createUUID } from '/src/utils/ids';

const getInitialValues = (props: PropsT & typeof DefaultProps) => {
  return {
    'clipPDForm.description': props.clipPD.description ?? null,
    'clipPDForm.tags': props.clipPD.tags ?? null,
    'clipPDForm.id': props.clipPD.id ?? createUUID(),
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
    const saveClipPD = props.clipPDEdit.save.bind(props.clipPDEdit);

    return saveClipPD({
      values: unflatten({
        ...values,
        'clipPDForm.tags': values['clipPDForm.tags'] ?? [],
      }),
    })
      .then((localClipPD: ClipPDT) => {
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
    props.clipPDEdit.cancel();
  };

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
