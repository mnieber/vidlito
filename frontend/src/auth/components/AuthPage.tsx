import React from 'react';
import { foo } from '/src/utils/classnames';

// Import styles
import './AuthPage.scss';

type PropsT = React.PropsWithChildren<{}>;

export const AuthPage = (props: PropsT) => {
  return (
    <div
      className={foo({
        component: ['AuthPage'],
        adhoc: ['flex flex-row justify-center', 'my-auto'],
      })}
    >
      {props.children}
    </div>
  );
};
