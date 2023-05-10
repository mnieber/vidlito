import React from 'react';
import { cn } from 'src/utils/classnames';

// Import styles
import './AuthPage.scss';

type PropsT = React.PropsWithChildren<{}>;

export const AuthPage = (props: PropsT) => {
  return (
    <div
      className={cn(
        'AuthPage',
        //
        //
        'flex flex-row justify-center',
        'my-auto'
      )}
    >
      {props.children}
    </div>
  );
};
