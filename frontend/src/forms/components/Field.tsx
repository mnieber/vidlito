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
    labelClassName?: any;
  }
>;

export const Field = observer((props: PropsT) => {
  return (
    <FormFieldContext {...props}>
      <div
        className={cn(
          //
          // 🔳 Field
          //
          'Field',
          'flex flex-col',
          '',
          props.className
        )}
      >
        <FormFieldLabel
          buttons={props.buttons}
          className={props.labelClassName}
        />
        {props.children}
      </div>
      <FormFieldError />
    </FormFieldContext>
  );
});
