import { observer } from 'mobx-react-lite';
import { isLoaded } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipFormView } from 'src/clips/components/ClipFormView';
import { ClipView } from 'src/clips/components/ClipView';
import { button, rowSkewer } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import UIkit from 'uikit';
import './EditableClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsEditing,
};

export const EditableClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!isLoaded(props.clip)) {
      return UIkit && <div data-uk-spinner className="" />;
    } else if (!props.clip) return null;

    return (
      <div className={cn('EditableClipView', props.className)}>
        <></>
        {/* Bar */}
        <></>
        <div className={cn('EditableClipView__Bar', 'grid grid-cols-[1fr]')}>
          <div
            className={cn('EditableClipView__BarRhs', rowSkewer, 'justify-end')}
          >
            <button
              className={cn('EditableClipView__BarRhsContents', rowSkewer, button)}
              onClick={() => props.clipsEditing.enable()}
            >
              Edit
            </button>
          </div>
        </div>
        <></>
        {/* Switch */}
        <></>
        {props.clipsEditing.isEditing && <ClipFormView />}
        {!props.clipsEditing.isEditing && <ClipView />}
      </div>
    );
  }, DefaultProps)
);
