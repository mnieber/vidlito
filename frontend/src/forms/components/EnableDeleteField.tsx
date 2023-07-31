import { observer } from 'mobx-react-lite';
import { useFormStateContext } from 'react-form-state-context';
import { DeletionWithFlag } from '/src/clips/ClipsState/facets/DeletionWithFlag';
import { FormField, FormFieldL } from '/src/forms/components/FormField';
import { useFormFieldContext } from '/src/forms/components/FormFieldContext';
import { Toggle } from '/src/frames/components/Toggle';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  deletionWithFlag: DeletionWithFlag;
  msg: string;
  className?: any;
};

export const EnableDeleteField = observer((props: PropsT) => {
  const formState = useFormStateContext();
  const formField = useFormFieldContext();

  return (
    <FormField
      className={cn('EnableDeleteField', FormFieldL.input(), props.className)}
    >
      <div className={cn(L.row.skewer(), 'justify-between')}>
        <div className={cn('text-sm font-bold text-gray-600')}>
          Enable delete
        </div>
        <Toggle
          className="mt-1 h-6 w-10"
          themeClassName="Red"
          id="enableDelete"
          onChange={(e: any) => {
            props.deletionWithFlag.setIsDeleteEnabled(e.target.checked);
            formState.setValue(formField.fieldName, e.target.checked);
          }}
          isChecked={props.deletionWithFlag.isDeleteEnabled}
        />
      </div>
      {props.deletionWithFlag.isDeleteEnabled && (
        <div className={cn('font-bold text-white mt-2')}>{props.msg}</div>
      )}
    </FormField>
  );
});
