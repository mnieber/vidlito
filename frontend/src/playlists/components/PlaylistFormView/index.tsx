import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { usePreviewButton } from '/src/clips/hooks/usePreviewButton';
import { MainFormL } from '/src/dashboard/components/MainView/MainForm';
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
import { CardL } from '/src/frames/components/Card';
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

    return (
      //
      // 🔳 PlaylistFormView 🔳
      //
      <div
        className={cn(
          'PlaylistFormView',
          [],
          [CardL.root(), CardL.color.gray(), props.className]
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
          <GlobalError className={MainFormL.GlobalError()} />
          {
            // 🔳 NameField 🔳
          }
          <Field
            fieldName="playlistForm.name"
            autoFocus={true}
            className={MainFormL.Field()}
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
          <Field fieldName="playlistForm.slug" className={MainFormL.Field()}>
            <FormFieldLabel label="SLUG" />
            <SlugField relatedFieldName="playlistForm.name" />
          </Field>
          {
            // 🔳 IsPublicField 🔳
          }
          {isNewPlaylist && (
            <Field
              fieldName="playlistForm.isPublic"
              className={MainFormL.Field()}
            >
              <FormFieldLabel label="SETTINGS" />
              <IsPublicPlaylistField />
            </Field>
          )}
          {
            // 🔳 TagsField 🔳
          }
          <Field fieldName="playlistForm.tags" className={MainFormL.Field()}>
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
            className={MainFormL.Field()}
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
          <div className={cn(MainFormL.Buttons())}>
            <FormCancelButton
              className={cn(MainFormL.Button.root(), MainFormL.Button.gap())}
              label="Cancel"
              tabIndex={6}
            />
            <FormSaveButton
              label="Save"
              tabIndex={6}
              className={cn(MainFormL.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
