import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from '/src/app/defaultProps';
import { L } from '/src/frames/layout';
import { foo } from '/src/utils/classnames';

// Import styles
import './index.scss';
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
        className={foo({
          component: ['AuthCard'],
          adhoc: 'w-[396px] h-[332px]',
        })}
      >
        {
          // 🔳 AuthCard__Inner 🔳
        }
        <div
          id={props.id}
          className={foo({
            component: ['AuthCard__Inner', 'rounded-lg bg-blue-950'],
            adhoc: [L.col.banner(), 'px-8 py-6'],
          })}
        >
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
