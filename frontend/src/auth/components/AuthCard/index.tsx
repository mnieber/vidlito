import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import '/src/auth/components/AuthCard/FormField.scss';
import '/src/auth/components/AuthCard/FormSaveButton.scss';

type PropsT = React.PropsWithChildren<{
  id: string;
}>;

const DefaultProps = {};

export const AuthCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      //
      // 🔳 AuthCard 🔳
      //
      <div
        className={cn(
          'AuthCard',
          //
          //
          'w-[396px] h-[332px]'
        )}
      >
        {
          // 🔳 AuthCard__Inner 🔳
        }
        <div
          id={props.id}
          className={cn(
            'AuthCard__Inner__',
            'rounded-lg bg-blue-950',
            //
            //
            L.col.banner(),
            'px-8 py-6'
          )}
        >
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
