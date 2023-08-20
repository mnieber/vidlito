import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormState, FormStateProvider } from 'react-form-state-context';
import { form } from './form';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MainFormS } from '/src/dashboard/components/MainForm';
import {
  Field,
  FormFieldLabel,
  GlobalError,
  HorizontalTagPicker,
} from '/src/forms/components';
import { FormSaveButton } from '/src/forms/components/FormSaveButton';
import { KeywordsAndTagsField } from '/src/forms/components/KeywordsAndTagsField';
import { CardS } from '/src/frames/components/Card';
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
          CardS.root(),
          CardS.color.gray(),
          CardS.size.medium(),
          'SearchFormView',
          [props.className]
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
          <GlobalError className={MainFormS.GlobalError()} />
          <Field
            fieldName="searchForm.playlistTerms"
            className={MainFormS.Field()}
          >
            <FormFieldLabel label="Playlist terms and #tags" />
            <KeywordsAndTagsField
              tabIndex={1}
              controlled={true}
              autoFocus={true}
              tagsState={playlistTagsState}
            />
            <HorizontalTagPicker tabIndex={2} tagsState={playlistTagsState} />
          </Field>
          <Field fieldName="searchForm.clipTerms" className={MainFormS.Field()}>
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
          <div className={cn(MainFormS.Buttons())}>
            <FormSaveButton
              theme="MainView"
              tabIndex={5}
              label="Search"
              className={cn(MainFormS.Button.root())}
            />
          </div>
        </FormStateProvider>
      </div>
    );
  }, DefaultProps)
);
