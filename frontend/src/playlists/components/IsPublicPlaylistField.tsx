import { observer } from 'mobx-react-lite';
import { useFormStateContext } from 'react-form-state-context';
import { withDefaultProps } from '/src/app/defaultProps';
import { FormField, FormFieldL } from '/src/forms/components/FormField';
import { useFormFieldContext } from '/src/forms/components/FormFieldContext';
import { DialogButtonL } from '/src/frames/components/DialogButton';
import { Icon, IconL } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './IsPublicPlaylistField.scss';

export type PropsT = {};

export const DefaultProps = {};

export const IsPublicPlaylistField = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const formState = useFormStateContext();
    const fieldContext = useFormFieldContext();
    const isPublic = formState.getValue(fieldContext.fieldName);

    return (
      <FormField className={cn('IsPublicPlaylistField', FormFieldL.input())}>
        <div
          className={cn('IsPublicPlaylistField__Option', [
            'my-2',
            L.row.flagPole(),
          ])}
          onClick={() => formState.setValue(fieldContext.fieldName, true)}
        >
          <Icon
            className={cn(DialogButtonL.icon.root(), IconL.color.gray())}
            name={isPublic ? 'radioButtonOn' : 'radioButtonOff'}
          />
          <div>
            <div className={cn('IsPublicPlaylistField__Label', ['mr-1'])}>
              Public
            </div>
            <div>Your clips in this playlist will be visible to everyone.</div>
          </div>
        </div>
        <div
          className={cn('IsPublicPlaylistField__Option', [
            'my-2',
            L.row.flagPole(),
          ])}
          onClick={() => formState.setValue(fieldContext.fieldName, false)}
        >
          <Icon
            className={cn(DialogButtonL.icon.root(), IconL.color.gray())}
            name={!isPublic ? 'radioButtonOn' : 'radioButtonOff'}
          />
          <div>
            <div className={cn('IsPublicPlaylistField__Label', ['mr-1'])}>
              Private
            </div>
            <div>
              Your clips are not visible to other people (unless one of your
              public playlists also contains them).
            </div>
          </div>
        </div>
      </FormField>
    );
  }, DefaultProps)
);
