import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import {
  FormStateProvider,
  HandleCancelArgsT,
  HandleSubmitArgsT,
  HandleValidateArgsT,
  unflatten,
} from 'react-form-state-context';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import {
  CancelButton,
  Field,
  GlobalError,
  SaveButton,
  SlugField,
  TextAreaField,
  TextField,
  UpdateSlugButton,
} from 'src/forms/components';
import { colBanner, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import { createUUID } from 'src/utils/ids';
import './PlaylistFormView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.locationState,
  ...dps.playlist,
  ...dps.playlistsEditing,
};

export const PlaylistFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const savePlaylist = props.playlistsEditing.save.bind(
      props.playlistsEditing
    );
    const initialValues = {
      'playlistForm.description': props.playlist.description ?? null,
      'playlistForm.id': props.playlist.id ?? createUUID().hex,
      'playlistForm.name': props.playlist.name ?? null,
      'playlistForm.slug': props.playlist.slug ?? null,
    };
    const initialErrors = {};
    const handleValidate = ({ values, setError }: HandleValidateArgsT) => {
      if (R.isNil(values['playlistForm.name'])) {
        setError('playlistForm.name', 'This field is required');
      }
      if (R.isNil(values['playlistForm.slug'])) {
        setError('playlistForm.slug', 'This field is required');
      }
    };
    const handleSubmit = ({ formState, values }: HandleSubmitArgsT) => {
      return savePlaylist(unflatten(values)).then(
        (localPlaylist: PlaylistT) => {
          formState.reset(initialValues, initialErrors);
          props.locationState.goToPlaylist(localPlaylist);
        }
      );
    };
    const handleCancel = ({ formState }: HandleCancelArgsT) => {
      props.playlistsEditing.cancel();
      props.locationState.goBack();
    };

    return (
      <div className={cn('PlaylistFormView', colBanner, props.className)}>
        <FormStateProvider
          initialValues={initialValues}
          initialErrors={initialErrors}
          handleValidate={handleValidate}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        >
          <GlobalError />
          <Field fieldName="playlistForm.name" label="Name">
            <TextField controlled={true} />
          </Field>
          <Field
            fieldName="playlistForm.slug"
            label="Slug"
            buttons={[
              <UpdateSlugButton key="1" relatedFieldName="playlistForm.name" />,
            ]}
          >
            <SlugField />
          </Field>
          <Field
            fieldName="playlistForm.description"
            label="Description"
            tabOnEnter={false}
          >
            <TextAreaField controlled={true} />
          </Field>
          <div className={cn(rowSkewer, 'self-end')}>
            <CancelButton label="Cancel" disabled={false} />
            <SaveButton label="Save" disabled={false} />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
