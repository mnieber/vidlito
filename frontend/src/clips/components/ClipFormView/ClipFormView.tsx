import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { withContextProps } from 'react-props-from-context';
import { form } from './form';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
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
  NameField,
  SlugField,
  ValuePickerField,
} from '/src/forms/components';
import { ClipUrlField } from '/src/forms/components/ClipUrlField';
import { TimeField } from '/src/forms/components/TimeField';
import { CardS } from '/src/frames/components/Card';
import { L } from '/src/frames/layout';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { searchCtx } from '/src/search/hooks/useSearchContext';
import { cn } from '/src/utils/classnames';
import { videoPlayerCtx } from '/src/videos/hooks/useVideoPlayerContext';

// Import styles
import './ClipFormView.scss';

export type PropsT = {
  className?: any;
};

export const ContextProps = {
  playlist: playlistsCtx.playlist,
  clip: clipsCtx.clip,
  clipsEdit: clipsCtx.clipsEdit,
  clipsAddition: clipsCtx.clipsAddition,
  videoPlayerState: videoPlayerCtx.videoPlayerState,
  dashboardState: dashboardCtx.dashboardState,
  searchState: searchCtx.searchState,
};

export const ClipFormView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const { showPreviewButton, descriptionPreview } = usePreviewButton({
      tabIndex: 9,
      className: 'font-normal',
    });
    const formStateRef = React.useRef<FormState>(null);

    if (!props.clip) {
      return null;
    }

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      //
      // 🔳 ClipFormView 🔳
      //
      <div
        className={cn(CardS.root(), 'ClipFormView', [
          CardS.color.gray(),
          props.className,
        ])}
      >
        {
          // 🔳 FormStateProvider 🔳
        }
        <FormStateProvider
          formStateRef={formStateRef}
          initialValues={initialValues}
          initialErrors={initialErrors}
          handleValidate={form.getHandleValidate(props)}
          handleSubmit={form.getHandleSubmit(
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
            // 🔳 UrlField 🔳
          }
          <Field fieldName="clipForm.url" className={MainFormS.Field()}>
            <FormFieldLabel label="URL" />
            <ClipUrlField
              tabIndex={1}
              controlled={true}
              autoFocus={true}
              autoSelect={true}
              onChange={() => {
                const getValue = formStateRef.current!.getValue;
                const url = getValue('clipForm.url');
                if (url) {
                  const startTimeS = getValue('clipForm.startTimeS');
                  props.videoPlayerState.setUrl(url, startTimeS * 1000 ?? 0);
                }
              }}
            />
          </Field>
          {
            // 🔳 NameField 🔳
          }
          <Field fieldName="clipForm.name" className={MainFormS.Field()}>
            <FormFieldLabel label="NAME" />
            <NameField
              tabIndex={2}
              controlled={true}
              autoSelect={true}
              slugFieldName={
                initialValues['clipForm.slug'] === 'new-clip'
                  ? 'clipForm.slug'
                  : undefined
              }
            />
          </Field>
          {
            // 🔳 SlugField 🔳
          }
          <Field fieldName="clipForm.slug" className={MainFormS.Field()}>
            <FormFieldLabel label="SLUG" />
            <SlugField relatedFieldName="clipForm.name" />
          </Field>
          <div className={cn(MainFormS.Field(), L.row.skewer())}>
            {
              // 🔳 StartTimeField 🔳
            }
            <Field className={cn('mr-2')} fieldName="clipForm.startTimeS">
              <FormFieldLabel label="START TIME" />
              <TimeField
                videoPlayerState={props.videoPlayerState}
                controlled={true}
                tabIndex={3}
              />
            </Field>
            {
              // 🔳 EndTimeField 🔳
            }
            <Field fieldName="clipForm.endTimeS">
              <FormFieldLabel label="END TIME" />
              <TimeField
                videoPlayerState={props.videoPlayerState}
                controlled={true}
                tabIndex={4}
              />
            </Field>
          </div>
          {
            // 🔳 TagsField 🔳
          }
          <Field fieldName="clipForm.tags" className={MainFormS.Field()}>
            <FormFieldLabel label="TAGS" />
            <ValuePickerField
              tabIndex={5}
              isCreatable={true}
              placeholder=""
              isMulti={true}
              tabOnEnter={false}
              labelFromValue={(x: any) => x}
              loadOptions={props.searchState.tagsCtr.store.loadTags}
            />
          </Field>
          {
            // 🔳 DescriptionField 🔳
          }
          <Field
            fieldName="clipForm.description"
            tabOnEnter={false}
            className={MainFormS.Field()}
          >
            <FormFieldLabel label="DESCRIPTION" buttons={[showPreviewButton]} />
            <MarkdownField
              tabIndex={6}
              controlled={true}
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
              tabIndex={10}
              label="Cancel"
            />
            <FormSaveButton
              theme="MainView"
              tabIndex={10}
              label="Save"
              className={cn(MainFormS.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, ContextProps)
);
