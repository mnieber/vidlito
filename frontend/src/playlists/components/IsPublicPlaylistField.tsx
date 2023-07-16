import { observer } from 'mobx-react-lite';
import { useFormStateContext } from 'react-form-state-context';
import { withDefaultProps } from '/src/app/defaultProps';
import { useFormFieldContext } from '/src/forms/components/FormFieldContext';
import { Icon } from '/src/frames/components/Icon';
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
      <div
        className={cn(
          'IsPublicPlaylistField',
          L.FormField.root(),
          L.FormField.input()
        )}
      >
        <div
          className={cn(
            'IsPublicPlaylistField__Option',
            'my-2',
            L.row.flagPole()
          )}
          onClick={() => formState.setValue(fieldContext.fieldName, true)}
        >
          <Icon
            className={cn(
              L.DialogButton.icon.root(),
              L.DialogButton.icon.color.gray()
            )}
            name={isPublic ? 'radioButtonOn' : 'radioButtonOff'}
          />
          This playlist is public. When clips are created in this playlist or
          moved to this playlist, they will be visible to everyone.
        </div>
        <div
          className={cn(
            'IsPublicPlaylistField__Option',
            'my-2',
            L.row.flagPole()
          )}
          onClick={() => formState.setValue(fieldContext.fieldName, false)}
        >
          <Icon
            className={cn(
              L.DialogButton.icon.root(),
              L.DialogButton.icon.color.gray()
            )}
            name={!isPublic ? 'radioButtonOn' : 'radioButtonOff'}
          />
          This playlist is private. Clips in this playlist are not publicly
          visible, UNLESS these clips are also in a public playlist owned by
          you.
        </div>
      </div>
    );
  }, DefaultProps)
);
