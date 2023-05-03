import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'src/app/defaultProps';
import { colBanner } from 'src/frames/components/Banner';
import { cln } from 'src/utils/classnames';

// Import styles
import 'src/auth/components/AuthCard/FormField.scss';
import 'src/auth/components/AuthCard/SaveButton.scss';

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
      <div className={cln('AuthCard', 'w-[396px] h-[332px]')()}>
        {
          // 🔳 AuthCard__Inner 🔳
        }
        <div
          id={props.id}
          className={cln(
            'AuthCard__Inner',
            'rounded-lg bg-blue-950',
            'px-8 py-6'
          )(
            //
            colBanner
          )}
        >
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
