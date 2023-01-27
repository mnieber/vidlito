import { observer } from 'mobx-react-lite';
import { isLoaded } from 'src/api/ResourceState';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipFormView } from 'src/clips/components/ClipFormView';
import { ClipHeaderView } from 'src/clips/components/ClipHeaderView';
import { ClipView } from 'src/clips/components/ClipView';
import UIkit from 'src/frames/styles/uikit';
import { cn } from 'src/utils/classnames';
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
        <ClipHeaderView />
        <></>
        {/* Switch */}
        <></>
        {props.clipsEditing.isEditing && <ClipFormView />}
        {!props.clipsEditing.isEditing && <ClipView />}
      </div>
    );
  }, DefaultProps)
);
