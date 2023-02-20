import { TextField } from 'src/forms/components/TextField';
import { FieldPropsT } from 'src/forms/hooks';
import { cn } from 'src/utils/classnames';

type PropsT = Partial<FieldPropsT> & {
  className?: any;
};

export const SlugField = (props: PropsT) => {
  return (
    <TextField
      className={cn('flex-1', props.className)}
      {...props}
      disabled={true}
      controlled={true}
    />
  );
};
