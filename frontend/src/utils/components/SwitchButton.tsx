import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

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
          'SwitchButton__LeftButton',
          {
            'text-xl': props.fontSize === 'big',
            'SwitchButton__LeftButton--active': props.state === 'left',
            'rounded-r-[32px] pr-7': !(props.hasRight ?? true),
          },
          [L.row.skewer(), 'pt-2.5 pb-3 pr-4 pl-7']
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
            'SwitchButton__RightButton',
            {
              'text-xl': props.fontSize === 'big',
              'SwitchButton__RightButton--active': props.state === 'right',
            },
            [L.row.skewer(), 'ml-[4px] pt-2.5 pb-3 pl-4 pr-7']
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
