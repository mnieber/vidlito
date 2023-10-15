import { observer } from 'mobx-react-lite';
import { useFormStateContext } from 'react-form-state-context';
import { withContextProps } from 'react-props-from-context';
import { FormField, FormFieldS } from '/src/forms/components/FormField';
import { useFormFieldContext } from '/src/forms/components/FormFieldContext';
import { Icon, IconS } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './IsPublicPlaylistField.scss';

export type PropsT = {};

export const ContextProps = {};

export const IsPublicPlaylistField = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const formState = useFormStateContext();
    const fieldContext = useFormFieldContext();
    const isPublic = formState.getValue(fieldContext.fieldName);

    return (
      <FormField className={cn(FormFieldS.Input(), 'IsPublicPlaylistField')}>
        <div
          className={cn('IsPublicPlaylistField__Option', [
            'my-2',
            L.row.flagPole(),
          ])}
          onClick={() => formState.setValue(fieldContext.fieldName, true)}
        >
          <Icon
            className={cn(FormFieldS.Icon(), IconS.color.gray())}
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
            className={cn(FormFieldS.Icon(), IconS.color.gray())}
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
  }, ContextProps)
);
