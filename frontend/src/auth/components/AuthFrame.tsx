import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'src/app/defaultProps';
import { cn, d } from 'src/utils/classnames';

type PropsT = React.PropsWithChildren<{
  header: string;
  id: string;
}>;

const DefaultProps = {};

export const AuthFrame = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        id={props.id}
        className={cn(
          //
          // 🔳 AuthFrame
          //
          d('AuthFrame'),
          'flex flex-col items-center',
          'mx-auto',
          'p-16',
          '',
          'bg-gray-900',
          'rounded-3xl'
        )}
      >
        <h1
          className={cn(
            //
            // 🔳 AuthFrame__Title
            //
            d('AuthFrame__Title'),
            'mb-12',
            '',
            'text-xl'
          )}
        >
          {props.header}
        </h1>
        {props.children}
      </div>
    );
  }, DefaultProps)
);
