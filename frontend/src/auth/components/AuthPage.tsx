import React from 'react';
import { cn } from '/src/utils/classnames';

// Import styles
import './AuthPage.scss';

type PropsT = React.PropsWithChildren<{}>;

export const AuthPage = (props: PropsT) => {
  return (
    <div
      className={cn(
        'AuthPage',
        [],
        ['flex flex-row justify-center', 'my-auto']
      )}
    >
      {props.children}
    </div>
  );
};

// An AuthPage has:
// - a LogoCard that appears on the left, e.g. 'Welcome to vidlito'.
// - a Gap that separates the LogoCard from the AuthCard.
// - an AuthCard on the right, e.g. a card for signing in.
export const AuthPageL = {
  Gap: () => 'w-[300px]',
};
