import { action, makeObservable, observable } from 'mobx';
import React from 'react';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { LoadTagsFnT } from '/src/search/SearchState/facets/TagsStore';
import { PickerValueT } from '/src/utils/components/ValuePicker';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = {
  loadOptions: LoadTagsFnT;
};

export const useTagsState = (props: PropsT): TagsState => {
  const inputRef = React.useRef<HTMLDivElement>(null);
  const pickerRef = React.useRef<HTMLDivElement>(null);
  const tagsState = useBuilder(
    () =>
      new TagsState({
        inputRef: inputRef,
        pickerRef: pickerRef,
      })
  );

  useUpdateStateReaction({
    getInputs: () => ({
      tagPrefix: tagsState.tagPrefix,
    }),
    updateState: (inputs) => {
      props
        .loadOptions(inputs.tagPrefix, (x: any) => Promise.resolve(x))
        .then((options: any) => {
          tagsState.setOptions(options);
        });
    },
  });

  return tagsState;
};

type ArgsT = {
  inputRef: React.RefObject<HTMLDivElement>;
  pickerRef: React.RefObject<HTMLDivElement>;
};

export class TagsState {
  tagPrefix: string = '';
  selectedTagIdx: number = 0;
  inputRef: React.RefObject<HTMLDivElement>;
  pickerRef: React.RefObject<HTMLDivElement>;
  options: PickerValueT[] = [];
  isPickerFocused: boolean = false;

  setTagPrefix(tagPrefix: string) {
    this.tagPrefix = tagPrefix;
  }

  setSelectedTagIdx(idx: number) {
    this.selectedTagIdx = idx;
  }

  setOptions(options: PickerValueT[]) {
    this.options = options;
  }

  setIsPickerFocused(isPickerFocused: boolean) {
    this.isPickerFocused = isPickerFocused;
  }

  constructor(args: ArgsT) {
    this.inputRef = args.inputRef;
    this.pickerRef = args.pickerRef;

    makeObservable(this, {
      tagPrefix: observable,
      options: observable,
      selectedTagIdx: observable,
      isPickerFocused: observable,
      setTagPrefix: action,
      setSelectedTagIdx: action,
      setOptions: action,
      setIsPickerFocused: action,
    });
  }
}
