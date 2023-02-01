import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useMenuHandler } from 'src/frames/hooks/useMenuHandler';
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
    const menuHandler = useMenuHandler();
    return (
      <div
        ref={menuHandler.ref}
        className={cn('ClipMenu', 'uk-dropdown', props.className)}
      >
        Delete
      </div>
    );
  }, DefaultProps)
);
