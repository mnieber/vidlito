import React from 'react';
import { cn } from 'src/utils/classnames';

type PropsT = React.PropsWithChildren<{}>;

export const AuthPage = (props: PropsT) => {
  return (
    <div className={cn('flex flex-row justify-center', 'my-auto')}>
      {props.children}
    </div>
  );
};

export const authPage = { gap: 'w-[300px]' };
