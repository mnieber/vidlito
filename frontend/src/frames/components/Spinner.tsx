import { DialogButtonL } from '/src/frames/components/DialogButton';
import { Icon } from '/src/frames/components/Icon';
import { cn } from '/src/utils/classnames';

export const Spinner = () => {
  return <Icon className={cn(DialogButtonL.icon.root())} name="check" />;
};
