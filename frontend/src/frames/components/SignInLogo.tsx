import { colBanner, rowBanner } from 'src/frames/components';
import { cln, cn } from 'src/utils/classnames';

import './SignInLogo.scss';

export type PropsT = {};

export const SignInLogo = (props: PropsT) => {
  return (
    //
    // 🔳🔳 SignInLogo__SubTitle
    //
    <div className={cn('SignInLogo', colBanner)}>
      <div
        className={cln(
          'SignInLogo__Title__',
          'text-6xl font-bold'
        )(
          //
          rowBanner
        )}
      >
        <div className={cln('SignInLogo__TitlePrefix__', `text-primaryBlue`)()}>
          vid
        </div>
        <div className={cln('SignInLogo__TitleSuffix__', `text-primaryTeal`)()}>
          lito
        </div>
      </div>
      {
        //
        // 🔳🔳 SignInLogo__SubTitle
        //
      }
      <div
        className={cn(
          cln(
            'SignInLogo__SubTitle__',
            'text-white tracking-wide'
          )(
            //
            'mb-8'
          )
        )}
      >
        Manage your lists of videos
      </div>
      {
        //
        // 🔳🔳 SignInLogo__ExploreAsGuestButton
        //
      }
      <button className={cn('SignInLogo__ExploreAsGuestButton')}>
        Explore as Guest
      </button>
    </div>
  );
};
