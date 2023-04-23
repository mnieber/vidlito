import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { usePreviewButton } from 'src/clips/hooks/usePreviewButton';
import {
  CancelButton,
  Field,
  FormFieldLabel,
  GlobalError,
  MarkdownField,
  SaveButton,
  SlugField,
  UpdateSlugButton,
  ValuePickerField,
} from 'src/forms/components';
import { NameField } from 'src/forms/components/NameField';
import { colBanner, rowSkewer } from 'src/frames/components';
import {
  PlaylistsUrlEventsT,
  UrlEventHandler,
  useUrlEventHandler,
} from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import './index.scss';

const fieldLabel = ['mb-1'];

export type UrlEventsT = PlaylistsUrlEventsT;
export type UrlEventHandlerT = UrlEventHandler & UrlEventsT;

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.playlist,
  ...dps.playlistsEdit,
};

export const PlaylistFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEventHandler<UrlEventHandlerT>();

    const { showPreviewButton, descriptionPreview } = usePreviewButton({
      tabIndex: 4,
    });

    if (!props.playlist) return null;

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      //
      // 🔳 PlaylistFormView 🔳
      //
      <div className={cn('PlaylistFormView', colBanner, props.className)}>
        {
          //
          // 🔳 FormStateProvider 🔳
          //
        }
        <FormStateProvider
          initialValues={form.getInitialValues(props)}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
            props,
            urlEvents,
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props, urlEvents)}
        >
          <GlobalError />
          {
            //
            // 🔳 NameField 🔳
            //
          }
          <Field fieldName="playlistForm.name" label="Name" autoFocus={true}>
            <FormFieldLabel className={cn(fieldLabel)} />
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
            //
            // 🔳 SlugField 🔳
            //
          }
          <Field fieldName="playlistForm.slug" label="Slug">
            <FormFieldLabel
              className={cn(fieldLabel)}
              buttons={[
                <UpdateSlugButton
                  key="1"
                  tabIndex={2}
                  relatedFieldName="playlistForm.name"
                />,
              ]}
            />
            <SlugField relatedFieldName="playlistForm.name" />
          </Field>
          {
            //
            // 🔳 DescriptionField 🔳
            //
          }
          <Field
            fieldName="playlistForm.description"
            label="Description"
            tabOnEnter={false}
          >
            <FormFieldLabel
              className={cn(fieldLabel)}
              buttons={[showPreviewButton]}
            />
            <MarkdownField
              controlled={true}
              tabIndex={3}
              preview={descriptionPreview}
            />
          </Field>
          {
            //
            // 🔳 TagsField 🔳
            //
          }
          <Field fieldName="playlistForm.tags" label="Tags">
            <FormFieldLabel className={cn(fieldLabel)} />
            <ValuePickerField
              tabIndex={5}
              isCreatable={true}
              isMulti={true}
              pickableValues={['one', 'two']}
              labelFromValue={(x: any) => x}
            />
          </Field>
          <div className={cn(rowSkewer, 'self-end')}>
            <CancelButton label="Cancel" tabIndex={6} />
            <SaveButton label="Save" tabIndex={6} />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
