import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
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

export const ContextProps = {};

export const Toggle = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const themeClassName = props.themeClassName ?? 'Blue';
    return (
      <label
        htmlFor={props.id}
        className={cn(['Toggle', themeClassName], [props.className])}
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
  }, ContextProps)
);
