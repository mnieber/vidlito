import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
} from 'react-form-state-context';
import { DefaultProps, PropsT } from './index';

const getInitialValues = (props: PropsT & typeof DefaultProps) => {
  return {
    'searchForm.playlistTerms': null,
    'searchForm.clipTerms': null,
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
    return props.searchState.searchContent({
      clipTerms: values['searchForm.clipTerms'],
      clipTags: [],
      playlistTerms: values['searchForm.playlistTerms'],
      playlistTags: [],
    });
  };

const getHandleCancel =
  (props: PropsT & typeof DefaultProps) =>
  ({ formState }: HandleCancelArgsT) => {};

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
