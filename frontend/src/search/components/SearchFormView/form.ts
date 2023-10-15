import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
} from 'react-form-state-context';
import { ContextProps, PropsT } from './index';

const getInitialValues = (props: PropsT & typeof ContextProps) => {
  return {
    'searchForm.playlistTerms': props.search.form?.playlistTerms ?? null,
    'searchForm.clipTerms': props.search.form?.clipTerms ?? null,
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
    props.search.search({
      clipTerms: values['searchForm.clipTerms'] ?? '',
      playlistTerms: values['searchForm.playlistTerms'] ?? '',
    });
    return Promise.resolve();
  };

const getHandleCancel =
  (props: PropsT & typeof ContextProps) =>
  ({ formState }: HandleCancelArgsT) => {};

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
