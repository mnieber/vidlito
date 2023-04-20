import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'src/app/defaultProps';
import { colBanner } from 'src/frames/components';
import { cn, d } from 'src/utils/classnames';

type PropsT = React.PropsWithChildren<{
  id: string;
}>;

const DefaultProps = {};

export const AuthCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      //
      // 🔳 AuthCard
      //
      <div className={cn(d('AuthCard'), authCard.container.dimensions)}>
        {
          //
          // 🔳 AuthCard__Inner
          //
        }
        <div
          id={props.id}
          className={cn(
            d('AuthCard__Inner'),
            colBanner,
            'px-8 py-6',
            '',
            'rounded-lg',
            'bg-blue-950'
          )}
        >
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);

export const authCard = {
  submitButton: { container: ['bg-blue-400', '!text-white'] },
  form: { stackOnMessage: 'mb-2' },
  gapToSplitBody: 'mb-8',
  container: { dimensions: 'w-[396px] h-[332px]' },
};
