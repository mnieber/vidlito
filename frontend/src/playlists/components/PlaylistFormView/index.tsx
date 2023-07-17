import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { usePreviewButton } from '/src/clips/hooks/usePreviewButton';
import {
  Field,
  FormCancelButton,
  FormFieldLabel,
  FormSaveButton,
  GlobalError,
  MarkdownField,
  SlugField,
  ValuePickerField,
} from '/src/forms/components';
import { NameField } from '/src/forms/components/NameField';
import { L } from '/src/frames/layout';
import { IsPublicPlaylistField } from '/src/playlists/components/IsPublicPlaylistField';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.playlist,
  ...dps.playlistsEdit,
  ...dps.playlistsAddition,
  ...dps.dashboardState,
};

export const PlaylistFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { showPreviewButton, descriptionPreview } = usePreviewButton({
      tabIndex: 4,
      className: 'font-normal',
    });

    if (!props.playlist) return null;

    const isNewPlaylist = props.playlist.slug === 'new-playlist';

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    const l = L.main.MainForm;

    return (
      //
      // 🔳 PlaylistFormView 🔳
      //
      <div
        className={cn(
          'PlaylistFormView',
          //
          //
          l.root(),
          props.className
        )}
      >
        {
          // 🔳 FormStateProvider 🔳
        }
        <FormStateProvider
          initialValues={form.getInitialValues(props)}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
            props,
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props)}
        >
          <GlobalError className={l.GlobalError()} />
          {
            // 🔳 NameField 🔳
          }
          <Field
            fieldName="playlistForm.name"
            autoFocus={true}
            className={l.Field()}
          >
            <FormFieldLabel label="NAME" />
            <NameField
              tabIndex={1}
              controlled={true}
              autoSelect={true}
              slugFieldName={
                initialValues['playlistForm.slug'] === 'new-playlist'
                  ? 'playlistForm.slug'
                  : undefined
              }
            />
          </Field>
          {
            // 🔳 SlugField 🔳
          }
          <Field fieldName="playlistForm.slug" className={l.Field()}>
            <FormFieldLabel label="SLUG" />
            <SlugField relatedFieldName="playlistForm.name" />
          </Field>
          {
            // 🔳 IsPublicField 🔳
          }
          {isNewPlaylist && (
            <Field fieldName="playlistForm.isPublic" className={l.Field()}>
              <FormFieldLabel label="SETTINGS" />
              <IsPublicPlaylistField />
            </Field>
          )}
          {
            // 🔳 TagsField 🔳
          }
          <Field fieldName="playlistForm.tags" className={l.Field()}>
            <FormFieldLabel label="TAGS" />
            <ValuePickerField
              tabIndex={5}
              isCreatable={true}
              isMulti={true}
              pickableValues={['one', 'two']}
              labelFromValue={(x: any) => x}
            />
          </Field>
          {
            // 🔳 DescriptionField 🔳
          }
          <Field
            fieldName="playlistForm.description"
            tabOnEnter={false}
            className={l.Field()}
          >
            <FormFieldLabel label="DESCRIPTION" buttons={[showPreviewButton]} />
            <MarkdownField
              controlled={true}
              tabIndex={3}
              preview={descriptionPreview}
            />
          </Field>
          {
            // 🔳 Buttons 🔳
          }
          <div className={cn(l.Buttons())}>
            <FormCancelButton
              className={cn(l.Button.root(), l.Button.gap())}
              label="Cancel"
              tabIndex={6}
            />
            <FormSaveButton
              label="Save"
              tabIndex={6}
              className={cn(l.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
