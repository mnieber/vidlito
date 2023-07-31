import { observer } from 'mobx-react-lite';
import { cn } from '/src/utils/classnames';

// Import styles
import './FormField.AuthCard.scss';
import './FormField.MainView.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

export const FormField = observer((props: PropsT) => {
  return (
    <div className={cn('FormField', 'flex flex-col', props.className)}>
      {props.children}
    </div>
  );
});

export const FormFieldL = {
  input: () => 'FormField__Input grow',
  button: {
    root: () => 'FormField__Button',
    gap: () => 'mr-0.5',
  },
};
