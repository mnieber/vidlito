import * as R from 'ramda';
import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { ClipT } from 'src/api/types/ClipT';
import { createUUID } from 'src/utils/ids';
import { DefaultProps, PropsT } from './index';

const getInitialValues = (props: PropsT & typeof DefaultProps) => {
  return {
    'clipForm.description': props.clip.description ?? null,
    'clipForm.endTimeS': _toSeconds(props.clip.endTimeMs) ?? null,
    'clipForm.id': props.clip.id ?? createUUID().hex,
    'clipForm.name': props.clip.name ?? null,
    'clipForm.slug': props.clip.slug ?? null,
    'clipForm.startTimeS': _toSeconds(props.clip.startTimeMs) ?? null,
    'clipForm.tags': props.clip.tags ?? null,
    'clipForm.url': props.clip.url ?? null,
  };
};

const getInitialErrors = (props: PropsT & typeof DefaultProps) => {
  return {};
};

const getHandleValidate =
  (props: PropsT & typeof DefaultProps) =>
  ({ values, setError }: HandleValidateArgsT) => {
    if (R.isNil(values['clipForm.name'])) {
      setError('clipForm.name', 'This field is required');
    }
  };

const getHandleSubmit =
  (
    props: PropsT & typeof DefaultProps,
    initialValues: FormState['values'],
    initialErrors: FormState['errors']
  ) =>
  ({ formState, values }: HandleSubmitArgsT) => {
    const saveClip = props.clipsEditing.save.bind(props.clipsEditing);

    return saveClip(
      unflatten({
        ...values,
        'clipForm.endTimeMs': Math.trunc(values['clipForm.endTimeS'] * 1000),
        'clipForm.startTimeMs': Math.trunc(
          values['clipForm.startTimeS'] * 1000
        ),
        'clipForm.endTimeS': undefined,
        'clipForm.startTimeS': undefined,
      })
    ).then((localClip: ClipT) => {
      formState.reset(initialValues, initialErrors);
      props.locationState.goToClip(localClip);
    });
  };

const getHandleCancel =
  (props: PropsT & typeof DefaultProps) =>
  ({ formState }: HandleCancelArgsT) => {
    const mustGoBack = !!props.clipsAddition.item;
    props.clipsEditing.cancel();
    mustGoBack && props.locationState.goBack();
  };

const _toSeconds = (ms: number | undefined) => {
  return ms ? ms / 1000 : null;
};

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
