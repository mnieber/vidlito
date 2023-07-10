import { TextField } from '/src/forms/components';
import { PropsT as TextFieldPropsType } from '/src/forms/components/TextField';
import { TagsState } from '/src/search/hooks/useTagsState';

// Import styles
import './KeywordsAndTagsField.scss';

export type PropsT = TextFieldPropsType & {
  tagsState: TagsState;
};

export const KeywordsAndTagsField = (props: PropsT) => {
  return (
    <TextField
      {...props}
      inputRef={props.tagsState.inputRef}
      onChange={(e) => {
        const words = e.target.value.split(' ');
        const lastWord = words[words.length - 1];
        if (lastWord.startsWith('#')) {
          props.tagsState.setTagPrefix(lastWord.slice(1));
        } else {
          props.tagsState.setTagPrefix('');
        }
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        // If we press down then move the focus to the tag picker.
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          props.tagsState.pickerRef.current?.focus();
        }
      }}
    />
  );
};
