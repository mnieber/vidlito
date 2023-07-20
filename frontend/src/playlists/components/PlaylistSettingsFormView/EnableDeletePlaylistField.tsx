import { observer } from 'mobx-react-lite';
import { useFormStateContext } from 'react-form-state-context';
import { FormFieldL } from '/src/forms/components/FormField';
import { useFormFieldContext } from '/src/forms/components/FormFieldContext';
import { Toggle } from '/src/frames/components/Toggle';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  isDeleteEnabled: boolean;
  setIsDeleteEnabled: (isDeleteEnabled: boolean) => void;
  className?: any;
};

export const EnableDeletePlaylistField = observer((props: PropsT) => {
  const formState = useFormStateContext();
  const formField = useFormFieldContext();

  return (
    <div
      className={cn(
        'EnableDeletePlaylistField',
        FormFieldL.root(),
        FormFieldL.input(),
        props.className
      )}
    >
      <div className={cn(L.row.skewer(), 'justify-between')}>
        <div className={cn('text-sm font-bold text-gray-600')}>
          Enable delete
        </div>
        <Toggle
          className="mt-1 h-6 w-10"
          themeClassName="Red"
          id="enableDeletePlaylist"
          onChange={(e: any) => {
            props.setIsDeleteEnabled(e.target.checked);
            formState.setValue(formField.fieldName, e.target.checked);
          }}
          isChecked={props.isDeleteEnabled}
        />
      </div>
      {props.isDeleteEnabled && (
        <div className={cn('font-bold text-white mt-2')}>
          When you delete a playlist, then all private clips (i.e. clips that
          are not contained in one of your public playlists) will be deleted as
          well. Note that private clips can be identified by a dot behind their
          name in the clip list in the left sidebar.
        </div>
      )}
    </div>
  );
});
