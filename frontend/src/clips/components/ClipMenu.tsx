import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useMenuRef } from 'src/frames/hooks/useMenuRef';
import { cn } from 'src/utils/classnames';
import './ClipMenu.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsDeletion,
};

export const ClipMenu = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const menuRef = useMenuRef();
    return (
      <div
        ref={menuRef.ref}
        className={cn('ClipMenu', 'uk-dropdown', props.className)}
      >
        Delete
      </div>
    );
  }, DefaultProps)
);
