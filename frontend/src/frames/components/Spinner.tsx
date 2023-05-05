import { Icon } from 'src/frames/components/Icon';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';

export const Spinner = () => {
  return <Icon className={cn(L.DialogButton.icon())} name="check" />;
};
