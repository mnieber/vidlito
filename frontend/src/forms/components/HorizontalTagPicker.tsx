import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import * as React from 'react';
import { useFormStateContext } from 'react-form-state-context';
import { useFormFieldContext } from '/src/forms/components';
import { TagsState } from '/src/search/hooks/useTagsState';
import { cn } from '/src/utils/classnames';
import { PickerValueT } from '/src/utils/components/ValuePicker';

// Import styles
import './HorizontalTagPicker.scss';

export type PropsT = {
  tagsState: TagsState;
  tabIndex?: number;
};

export const HorizontalTagPicker = observer((props: PropsT) => {
  const formState = useFormStateContext();
  const fieldContext = useFormFieldContext();

  const formValue = formState.values[fieldContext.fieldName] ?? '';
  const topOptions = R.pipe(
    R.filter(
      (option: PickerValueT) => formValue.indexOf('#' + option.label) === -1
    ),
    R.take(5)
  )(props.tagsState.options) as PickerValueT[];

  const nrOfTopOptions = topOptions.length;
  React.useEffect(() => {
    props.tagsState.setSelectedTagIdx(
      R.clamp(0, R.max(0, nrOfTopOptions - 1), props.tagsState.selectedTagIdx)
    );
  }, [nrOfTopOptions]);

  if (!props.tagsState.options.length) {
    return null;
  }

  const select = (idx: number) => {
    const option = topOptions[idx];
    const words = (formState.getValue(fieldContext.fieldName) ?? '').split(' ');
    // Determine the new value which is made of all words except the last one,
    // plus the completed tag.
    const newWords = [...words.slice(0, -1), '#' + option.value];
    formState.setValue(fieldContext.fieldName, newWords.join(' ') + ' ');
    props.tagsState.inputRef.current?.focus();
    props.tagsState.setTagPrefix('');
  };

  const optionDivs = topOptions.map((option: PickerValueT, idx: number) => {
    return (
      <div
        key={option.value + '_' + props.tagsState.isPickerFocused.toString()}
        className={cn(
          'HorizontalTagPicker__Tag',
          {
            'HorizontalTagPicker__Tag--selected':
              idx === props.tagsState.selectedTagIdx &&
              props.tagsState.isPickerFocused,
          },
          ['mr-2']
        )}
        onClick={() => select(idx)}
      >
        {'#' + option.label}
      </div>
    );
  });

  return (
    <div
      ref={props.tagsState.pickerRef}
      className={cn('HorizontalTagPicker', [
        'flex flex-row flex-wrap',
        {
          'mt-2': optionDivs.length,
        },
      ])}
      tabIndex={props.tabIndex}
      onFocus={() => props.tagsState.setIsPickerFocused(true)}
      onBlur={() => props.tagsState.setIsPickerFocused(false)}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          select(props.tagsState.selectedTagIdx);
        }
        if (
          e.key === 'ArrowDown' &&
          props.tagsState.selectedTagIdx !== topOptions.length - 1
        ) {
          e.preventDefault();
          props.tagsState.setSelectedTagIdx(props.tagsState.selectedTagIdx + 1);
        } else if (
          e.key === 'ArrowUp' &&
          props.tagsState.selectedTagIdx === 0
        ) {
          e.preventDefault();
          props.tagsState.inputRef.current?.focus();
        } else if (e.key === 'ArrowUp' && props.tagsState.selectedTagIdx > 0) {
          props.tagsState.setSelectedTagIdx(props.tagsState.selectedTagIdx - 1);
        }
      }}
    >
      {optionDivs}
    </div>
  );
});
