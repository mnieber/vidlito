import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { CardS } from '/src/frames/components/Card';
import {
  BlueDialogButtonTrim,
  DialogButton,
  DialogButtonS,
  TealDialogButtonTrim,
} from '/src/frames/components/DialogButton';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { createTrim } from '/src/utils/trim';

// Import styles
import './index.scss';

export type PropsT = {};

export const ContextProps = {
  dashboardState: dashboardCtx.dashboardState,
};

export const CookieNotice = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
                trim={AcceptDialogButtonTrim}
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
                trim={RejectDialogButtonTrim}
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
  }, ContextProps)
);

const AcceptDialogButtonTrim = createTrim(BlueDialogButtonTrim, {
  base: {
    root: {
      padding: DialogButtonS.padding.big(),
    },
  },
});

const RejectDialogButtonTrim = createTrim(TealDialogButtonTrim, {
  base: {
    root: {
      padding: DialogButtonS.padding.big(),
    },
  },
});
