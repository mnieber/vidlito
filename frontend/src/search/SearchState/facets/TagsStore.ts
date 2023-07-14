import { getTags } from '/src/api/queries/useGetTags';
import { PickerValueT } from '/src/utils/components/ValuePicker';
import { ObjT } from '/src/utils/types';

export type LoadTagsFnT = TagsStore['loadTags'];

export class TagsStore {
  loadTags = (
    inputValue: string,
    callback: (options: PickerValueT[]) => any
  ) => {
    return getTags({ tagPrefix: inputValue, maxNrOfTags: 10 }).then(
      (response: ObjT) => {
        return callback(filterValues(response.tags, inputValue));
      }
    );
  };
}

const labelFromValue = (x: any) => x;

const toPickerValue = (pickableVal: any) => {
  return pickableVal.__isNew__
    ? pickableVal
    : {
        value: pickableVal,
        label: labelFromValue(pickableVal),
      };
};

const filterValues = (tags: string[], inputValue: string) => {
  return (tags ?? [])
    .map(toPickerValue)
    .filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};
