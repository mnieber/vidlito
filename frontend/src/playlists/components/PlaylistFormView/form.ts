import * as R from 'ramda';
import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { NavContext } from 'react-nav-handler';
import { DefaultProps, PropsT } from './index';
import { navToHome } from '/src/frames/navFunctions';
import { toPlaylist } from '/src/playlists/navFunctions';
import { createUUID } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

const getInitialValues = (props: PropsT & typeof DefaultProps) => {
  return {
    'playlistForm.description': props.playlist.description ?? null,
    'playlistForm.id': props.playlist.id ?? null,
    'playlistForm.isPublic': !!props.playlist.isPublic,
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
    navContext: NavContext,
    props: PropsT & typeof DefaultProps,
    initialValues: FormState['values'],
    initialErrors: FormState['errors']
  ) =>
  ({ formState, values }: HandleSubmitArgsT) => {
    return props.playlistsEdit
      .save({
        values: unflatten({
          ...values,
          'playlistForm.id': values['playlistForm.id'] ?? createUUID(),
        }),
      })
      .then((response: ObjT) => {
        navContext.nav(toPlaylist)(props.userProfile.username, response.slug);
      })
      .then(() => {
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
    const mustRestore = !!props.playlistsAddition.item;
    props.playlistsEdit.cancel();
    if (mustRestore) {
      if (!props.dashboardState.navigationState.restoreNavigationPoint()) {
        navToHome();
      }
    }
  };

export const form = {
  getHandleValidate,
  getHandleSubmit,
  getHandleCancel,
  getInitialValues,
  getInitialErrors,
};
