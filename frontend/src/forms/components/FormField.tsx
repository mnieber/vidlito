import { observer } from 'mobx-react-lite';
import { cn } from '/src/utils/classnames';

// Import styles
import './FormField.AuthCard.scss';
import './FormField.MainView.scss';

export type PropsT = React.PropsWithChildren<{
  componentClassName?: string;
  className?: any;
}>;

export const FormField = observer((props: PropsT) => {
  const name = props.componentClassName ?? 'FormField';

  return (
    <div className={cn(name, 'flex flex-col', props.className)}>
      {props.children}
    </div>
  );
});

export const FormFieldS = {
  Input: () => 'FormField__Input grow',
  Button: {
    root: () => 'FormField__Button',
    gap: () => 'mr-0.5',
  },
  Icon: () => cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]'),
};
