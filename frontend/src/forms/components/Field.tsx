import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  FormFieldContext,
  FormFieldContextPropsT,
  FormFieldError,
  FormFieldLabel,
} from 'src/forms/components';
import { cn } from 'src/utils/classnames';
import './Field.scss';

type PropsT = React.PropsWithChildren<
  FormFieldContextPropsT & {
    buttons?: any[];
    className?: any;
    classNameWithLabel?: any;
  }
>;

export const Field = observer((props: PropsT) => {
  return (
    <FormFieldContext {...props}>
      <div
        className={cn(
          'Field',
          'flex flex-col',
          'mb-4',
          props.className,
          'pb-1',
          props.classNameWithLabel
        )}
      >
        <FormFieldLabel buttons={props.buttons} />
        {props.children}
      </div>
      <FormFieldError />
    </FormFieldContext>
  );
});
