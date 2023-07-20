import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MainFormL } from '/src/dashboard/components/MainView/MainForm';
import {
  Field,
  FormFieldLabel,
  GlobalError,
  HorizontalTagPicker,
} from '/src/forms/components';
import { FormSaveButton } from '/src/forms/components/FormSaveButton';
import { KeywordsAndTagsField } from '/src/forms/components/KeywordsAndTagsField';
import { CardL } from '/src/frames/components/Card';
import { useTagsState } from '/src/search/hooks/useTagsState';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.searchState,
  ...dps.searchForm,
};

export const SearchFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const formStateRef = React.useRef<FormState>(null);
    const playlistTagsState = useTagsState({
      loadOptions: props.searchState.tagsCtr.store.loadTags,
    });
    const clipTagsState = useTagsState({
      loadOptions: props.searchState.tagsCtr.store.loadTags,
    });

    const initialValues = form.getInitialValues(props);
    const initialErrors = form.getInitialErrors(props);

    return (
      //
      // 🔳 SearchFormView 🔳
      //
      <div
        className={cn(
          'SearchFormView',
          [],
          [MainFormL.root(), CardL.size.medium(), props.className]
        )}
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
            // 🔳 UrlField 🔳
          }
          <GlobalError className={MainFormL.GlobalError()} />
          <Field
            fieldName="searchForm.playlistTerms"
            autoFocus={true}
            className={MainFormL.Field()}
          >
            <FormFieldLabel label="Playlist terms and #tags" />
            <KeywordsAndTagsField
              tabIndex={1}
              controlled={true}
              tagsState={playlistTagsState}
            />
            <HorizontalTagPicker tabIndex={2} tagsState={playlistTagsState} />
          </Field>
          <Field fieldName="searchForm.clipTerms" className={MainFormL.Field()}>
            <FormFieldLabel label="Clip terms and #tags" />
            <KeywordsAndTagsField
              tabIndex={3}
              controlled={true}
              tagsState={clipTagsState}
            />
            <HorizontalTagPicker tabIndex={4} tagsState={clipTagsState} />
          </Field>
          {
            // 🔳 Buttons 🔳
          }
          <div className={cn(MainFormL.Buttons())}>
            <FormSaveButton
              tabIndex={5}
              label="Search"
              className={cn(MainFormL.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
