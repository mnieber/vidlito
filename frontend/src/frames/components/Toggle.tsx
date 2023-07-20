import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { cn } from '/src/utils/classnames';

// Import styles
import './Toggle.scss';

export type PropsT = {
  isChecked: boolean;
  themeClassName?: 'Blue' | 'Red';
  id: string;
  onChange?: (e: any) => void;
  className?: any;
};

export const DefaultProps = {};

export const Toggle = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const themeClassName = props.themeClassName ?? 'Blue';
    return (
      <label
        htmlFor={props.id}
        className={cn(
          ['Toggle', themeClassName],
          'relative cursor-pointer',
          props.className
        )}
      >
        <input
          key={props.isChecked ? 'checked' : 'unchecked'}
          type="checkbox"
          id={props.id}
          className="peer sr-only"
          onChange={props.onChange}
          checked={props.isChecked}
        />
        <span className={cn(themeClassName, 'Toggle__ToggleContainer')}></span>
        <span className={cn(themeClassName, 'Toggle__Toggle')}></span>
      </label>
    );
  }, DefaultProps)
);
