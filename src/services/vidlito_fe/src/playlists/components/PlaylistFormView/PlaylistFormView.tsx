import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { useNavContext } from 'react-nav-handler';
import { withContextProps } from 'react-props-from-context';
import { form } from './form';
import { usePreviewButton } from '/src/clips/hooks/usePreviewButton';
import { MainFormS } from '/src/dashboard/components/MainForm';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
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
import { CardS } from '/src/frames/components/Card';
import { IsPublicPlaylistField } from '/src/playlists/components/IsPublicPlaylistField';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistFormView.scss';

export type PropsT = {
  className?: any;
};

export const ContextProps = {
  playlist: playlistsCtx.playlist,
  playlistsEdit: playlistsCtx.playlistsEdit,
  playlistsAddition: playlistsCtx.playlistsAddition,
  dashboardState: dashboardCtx.dashboardState,
  userProfile: dashboardCtx.userProfile,
};

export const PlaylistFormView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const navContext = useNavContext('PlaylistFormView');

    const { showPreviewButton, descriptionPreview } = usePreviewButton({
      tabIndex: 4,
      className: 'font-normal',
    });

    if (!props.playlist) {
      return null;
    }

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    const isNewPlaylist = props.playlist.slug === 'new-playlist';

    return (
      //
      // 🔳 PlaylistFormView 🔳
      //
      <div
        className={cn(CardS.root(), CardS.color.gray(), 'PlaylistFormView', [
          'self-start',
          props.className,
        ])}
      >
        {
          // 🔳 FormStateProvider 🔳
        }
        <FormStateProvider
          initialValues={initialValues}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
            navContext,
            props,
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props)}
        >
          {
            // 🔳 Global error 🔳
          }
          <GlobalError className={MainFormS.GlobalError()} />
          {
            // 🔳 Name field 🔳
          }
          <Field fieldName="playlistForm.name" className={MainFormS.Field()}>
            <FormFieldLabel label="NAME" />
            <NameField
              tabIndex={1}
              controlled={true}
              autoFocus={true}
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
          <Field fieldName="playlistForm.slug" className={MainFormS.Field()}>
            <FormFieldLabel label="SLUG" />
            <SlugField relatedFieldName="playlistForm.name" />
          </Field>
          {
            // 🔳 IsPublicField 🔳
          }
          {isNewPlaylist && (
            <Field
              fieldName="playlistForm.isPublic"
              className={MainFormS.Field()}
            >
              <FormFieldLabel label="SETTINGS" />
              <IsPublicPlaylistField />
            </Field>
          )}
          {
            // 🔳 TagsField 🔳
          }
          <Field fieldName="playlistForm.tags" className={MainFormS.Field()}>
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
            className={MainFormS.Field()}
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
          <div className={cn(MainFormS.Buttons())}>
            <FormCancelButton
              theme="MainView"
              className={cn(MainFormS.Button.root(), MainFormS.Button.gap())}
              label="Cancel"
              tabIndex={6}
            />
            <FormSaveButton
              theme="MainView"
              label="Save"
              tabIndex={6}
              className={cn(MainFormS.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, ContextProps)
);
