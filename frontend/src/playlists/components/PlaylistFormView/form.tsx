import * as R from 'ramda';
import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { createUUID } from 'src/utils/ids';
import { DefaultProps, PropsT, UrlEventHandlerT } from './index';

const getInitialValues = (props: PropsT & typeof DefaultProps) => {
  return {
    'playlistForm.description': props.playlist.description ?? null,
    'playlistForm.id': props.playlist.id ?? createUUID().hex,
    'playlistForm.name': props.playlist.name ?? null,
    'playlistForm.slug': props.playlist.slug ?? null,
    'playlistForm.tags': props.playlist.tags ?? [],
  };
};

const getInitialErrors = (props: PropsT & typeof DefaultProps) => {
  return {};
};

const getHandleValidate =
  (props: PropsT & typeof DefaultProps) =>
  ({ values, setError }: HandleValidateArgsT) => {
    if (R.isNil(values['playlistForm.name'])) {
      setError('playlistForm.name', 'This field is required');
    }
    if (R.isNil(values['playlistForm.slug'])) {
      setError('playlistForm.slug', 'This field is required');
    } else if (values['playlistForm.slug'] === 'new-playlist') {
      setError('playlistForm.slug', 'Sorry, this slug is already taken');
    }
  };

const getHandleSubmit =
  (
    props: PropsT & typeof DefaultProps,
    urlEvents: UrlEventHandlerT,
    initialValues: FormState['values'],
    initialErrors: FormState['errors']
  ) =>
  ({ formState, values }: HandleSubmitArgsT) => {
    return props.playlistsEdit
      .save(unflatten(values))
      .then((localPlaylist: PlaylistT) => {
        formState.reset(initialValues, initialErrors);
        urlEvents.userSubmittedPlaylistForm(localPlaylist.slug);
      })
      .catch((error: any) => {
        formState.setError(
          'global',
          'Oops, something went wrong, please try again later'
        );
      });
  };

const getHandleCancel =
  (props: PropsT & typeof DefaultProps, urlEvents: UrlEventHandlerT) =>
  ({ formState }: HandleCancelArgsT) => {
    props.playlistsEdit.cancel();
    urlEvents.userCancelledPlaylistForm();
  };

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
