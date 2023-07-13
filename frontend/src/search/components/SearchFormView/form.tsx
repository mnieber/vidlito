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
    const { terms: clipTerms, tags: clipTags } = get_terms_and_tags(
      values['searchForm.clipTerms'] ?? ''
    );
    const { terms: playlistTerms, tags: playlistTags } = get_terms_and_tags(
      values['searchForm.playlistTerms'] ?? ''
    );
    return props.searchState.searchContent({
      clipTerms: clipTerms,
      clipTags: clipTags,
      playlistTerms: playlistTerms,
      playlistTags: playlistTags,
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

const get_terms_and_tags = (input: string) => {
  const words = input
    .split(' ')
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
  const tags = words
    .filter((word) => word.startsWith('#'))
    .map((word) => word.slice(1));
  const terms = words.filter((word) => !word.startsWith('#'));
  return { terms, tags };
};
