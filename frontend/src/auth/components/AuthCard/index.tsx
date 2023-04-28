import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'src/app/defaultProps';
import { colBanner } from 'src/frames/components/Banner';
import { cln } from 'src/utils/classnames';

// Import styles
import './CreateAccountButton.scss';
import './FormField.scss';
import './SaveButton.scss';
import './index.scss';

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
        className={cln('AuthCard')(
          //
          'w-[396px] h-[332px]'
        )}
      >
        {
          // 🔳 AuthCard__Inner 🔳
        }
        <div
          id={props.id}
          className={cln('AuthCard__Inner')(
            //
            colBanner,
            'px-8 py-6'
          )}
        >
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);

export const AuthCard_ = {
  form: { stackOnMessage: 'mb-2' },
  formField: ['mb-2'],
  gapToSecundaryMsg: 'mb-8',
};
