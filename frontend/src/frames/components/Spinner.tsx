import { Icon } from 'src/frames/components/Icon';
import { lvi } from 'src/frames/components/Lvi';
import { cn } from 'src/utils/classnames';

export const Spinner = () => {
  return <Icon className={cn(lvi.leadingIcon)} name="check" />;
};
