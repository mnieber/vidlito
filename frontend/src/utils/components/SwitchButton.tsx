import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { inlineTrim } from '/src/utils/trim';

// Import styles
import './SwitchButton.scss';

export type PropsT = {
  state: 'left' | 'right';
  hasRight?: boolean;
  fontSize?: 'medium' | 'big';
  onToggle: (state: 'left' | 'right') => void;
  textLeft: string;
  textRight: string;
  className?: any;
};

export const SwitchButton = (props: PropsT) => {
  return (
    <div className={cn('SwitchButton', [L.row.banner(), props.className])}>
      {
        // 🔳 Left button 🔳
      }
      <button
        className={cn(
          inlineTrim(true, {
            componentName: 'SwitchButton__LeftButton',
            root: L.row.skewer(),
            padding: 'pt-2.5 pb-3 pr-4 pl-7',
          }),
          inlineTrim(props.state === 'left', {
            root: 'SwitchButton__LeftButton--active',
          }),
          inlineTrim(props.fontSize === 'big', {
            font: 'text-xl',
          }),
          inlineTrim(!(props.hasRight ?? true), {
            border: 'rounded-r-[32px]',
            padding: 'pr-7',
          })
        )}
        onClick={() => {
          props.onToggle('left');
        }}
      >
        {props.textLeft}
      </button>
      {
        // 🔳 Right button 🔳
      }
      {(props.hasRight ?? true) && (
        <button
          className={cn(
            inlineTrim(true, {
              componentName: 'SwitchButton__RightButton',
              root: L.row.skewer(),
              padding: 'pt-2.5 pb-3 pl-4 pr-7',
              margin: 'ml-[4px]',
            }),
            inlineTrim(props.state === 'right', {
              root: 'SwitchButton__RightButton--active',
            }),
            inlineTrim(props.fontSize === 'big', {
              font: 'text-xl',
            })
          )}
          onClick={() => {
            props.onToggle('right');
          }}
        >
          {props.textRight}
        </button>
      )}
    </div>
  );
};
