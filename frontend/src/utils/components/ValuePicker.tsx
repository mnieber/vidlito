import { observer } from 'mobx-react-lite';
import { isNil } from 'ramda';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

export interface PickerValueT {
  value: any;
  label: string;
  __isNew__?: boolean;
}

export type PropsT<ValueT> = {
  isMulti: boolean;
  isCreatable: boolean;
  loadOptions: (
    inputValue: string,
    callback: (options: any) => void
  ) => Promise<ValueT[]>;
  pickableValue: ValueT | ValueT[];
  labelFromValue: (value: any) => string;
  labelFromPickedValue?: (value: any) => string;
  placeholder?: string;
  [k: string]: any;
  className?: any;
};

export const ValuePicker = observer(
  <ValueT, ConcretePropsT extends PropsT<ValueT>>(
    props: ConcretePropsT
  ): JSX.Element => {
    const {
      isMulti,
      isCreatable,
      pickableValue,
      loadOptions,
      labelFromValue,
      labelFromPickedValue,
      placeholder,
      ...others
    } = props;

    const toPickedValue = (pickableVal: any) => {
      return pickableVal.__isNew__
        ? pickableVal
        : {
            value: pickableVal,
            label: (labelFromPickedValue ?? labelFromValue)(pickableVal),
          };
    };

    const pickerProps = {
      isMulti: isMulti,
      loadOptions,
      value: isNil(pickableValue)
        ? null
        : isMulti
        ? (pickableValue as any).map(toPickedValue)
        : toPickedValue(pickableValue),
      placeholder: placeholder ?? 'Select...',
      onKeyDown: (e: any) => {
        if (others.onKeyDown) {
          others.onKeyDown(e);
        }
      },
      ...others,
      className: undefined,
    };

    const picker = isCreatable ? (
      <AsyncCreatableSelect {...pickerProps} />
    ) : (
      <AsyncSelect {...pickerProps} />
    );

    return (
      <div className={props.className} style={{ zIndex: others.zIndex }}>
        {picker}
      </div>
    );
  }
);
