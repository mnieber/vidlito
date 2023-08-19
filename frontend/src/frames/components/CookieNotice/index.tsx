import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { dps } from '/src/app/defaultProps';
import { CardS } from '/src/frames/components/Card';
import { DialogButton } from '/src/frames/components/DialogButton';
import {
  BlueDialogButtonTheme,
  TealDialogButtonTheme,
} from '/src/frames/components/DialogButton/DialogButton';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';

export type PropsT = {};

export const DefaultProps = {
  ...dps.dashboardState,
};

export const CookieNotice = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('CookieNotice')}>
        <div
          className={cn(CardS.size.medium(), 'CookieNotice__Body', [
            'max-w-[800px] mx-auto',
          ])}
        >
          <div className="font-bold mb-8">
            This site uses essential cookies to store your sign-in information.
            To improve your experience on the site, it optionally uses
            functional cookies.
          </div>

          <div
            className={cn('CookieNotice__Buttons', [
              L.row.skewer(),
              'grow',
              'justify-between',
            ])}
          >
            <div>
              <DialogButton
                className=""
                theme={BlueDialogButtonTheme}
                fontSize="medium"
                padding="big"
                onClick={() =>
                  props.dashboardState.cookiesState.setCookiePreferences({
                    functionalCookies: true,
                  })
                }
                label="Accept functional cookies"
              />
            </div>
            <div>
              <DialogButton
                className=""
                theme={TealDialogButtonTheme}
                fontSize="medium"
                padding="big"
                onClick={() =>
                  props.dashboardState.cookiesState.setCookiePreferences({
                    functionalCookies: false,
                  })
                }
                label="Reject functional cookies"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }, DefaultProps)
);
