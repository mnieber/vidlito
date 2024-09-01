import * as R from 'ramda';
import {
  FormState,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { ContextProps, PropsT } from './index';
import { authNav } from '/src/auth/routes';
import { dashboardNav } from '/src/dashboard/routes';
import { navTo } from '/src/routes/navHandler';
import { createUUID } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

const getInitialValues = (props: PropsT & typeof ContextProps) => {
  return {
    'playlistForm.description': props.playlist.description ?? null,
    'playlistForm.id': props.playlist.id ?? null,
    'playlistForm.isPublic': !!props.playlist.isPublic,
    'playlistForm.name': props.playlist.name ?? null,
    'playlistForm.slug': props.playlist.slug ?? null,
    'playlistForm.tags': props.playlist.tags ?? [],
  };
};

const getInitialErrors = (props: PropsT & typeof ContextProps) => {
  return {};
};

const getHandleValidate =
  (props: PropsT & typeof ContextProps) =>
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
    props: PropsT & typeof ContextProps,
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
        navTo(
          dashboardNav.playlist({
            ownerUsername: props.userProfile.username,
            playlistSlug: response.slug,
          })
        );
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
  (props: PropsT & typeof ContextProps) =>
  ({ formState }: HandleCancelArgsT) => {
    const mustRestore = !!props.playlistsAddition.item;
    props.playlistsEdit.cancel();
    if (mustRestore) {
      if (!props.dashboardState.navigationState.restoreNavigationPoint()) {
        navTo(authNav.home({}));
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
