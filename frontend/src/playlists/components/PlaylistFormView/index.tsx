import { observer } from 'mobx-react-lite';
import { FormStateProvider } from 'react-form-state-context';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { usePreviewButton } from 'src/clips/hooks/usePreviewButton';
import {
  CancelButton,
  Field,
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
  PageEventHandler,
  PlaylistsPageEventsT,
  usePageEventHandler,
} from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import { form } from './form';
import './index.scss';

export type PageEventHandlerT = PageEventHandler & PlaylistsPageEventsT;

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.playlist,
  ...dps.playlistsEdit,
};

export const PlaylistFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const pageEvents = usePageEventHandler<PageEventHandlerT>();

    const { showPreviewButton, descriptionPreview } = usePreviewButton({
      tabIndex: 4,
    });

    if (!props.playlist) return null;

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      <div className={cn('PlaylistFormView', colBanner, props.className)}>
        <FormStateProvider
          initialValues={form.getInitialValues(props)}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
            props,
            pageEvents,
            initialValues,
            initialErrors
          )}
          handleCancel={form.getHandleCancel(props, pageEvents)}
        >
          <GlobalError />
          <Field fieldName="playlistForm.name" label="Name" autoFocus={true}>
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
          <Field
            fieldName="playlistForm.slug"
            label="Slug"
            buttons={[
              <UpdateSlugButton
                key="1"
                tabIndex={2}
                relatedFieldName="playlistForm.name"
              />,
            ]}
          >
            <SlugField />
          </Field>
          <Field
            fieldName="playlistForm.description"
            label="Description"
            tabOnEnter={false}
            buttons={[showPreviewButton]}
          >
            <MarkdownField
              controlled={true}
              tabIndex={3}
              preview={descriptionPreview}
            />
          </Field>
          <Field fieldName="playlistForm.tags" label="Tags">
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
