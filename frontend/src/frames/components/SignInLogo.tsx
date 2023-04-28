import { colBanner, rowBanner } from 'src/frames/components';
import { bigButton } from 'src/frames/components/Button';
import { cln, cn, d } from 'src/utils/classnames';

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
          'SignInLogo__TitlePrefix__',
          'text-6xl font-bold'
        )(
          //
          rowBanner
        )}
      >
        <div className={cn(d('SignInLogo__TitlePrefix'), `text-primaryBlue`)}>
          vid
        </div>
        <div className={cn(d('SignInLogo__TitleSuffix'), `text-primaryTeal`)}>
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
          d('SignInLogo__SubTitle'),
          'mb-8',
          //
          'text-white tracking-wide'
        )}
      >
        Manage your lists of videos
      </div>
      {
        //
        // 🔳🔳 SignInLogo__ExploreAsGuestButton
        //
      }
      <button
        className={cn(
          d('SignInLogo__ExploreAsGuestButton'),
          bigButton,
          '',
          `bg-blue-200 !text-blue-800`,
          `border border-primaryBlue`
        )}
      >
        Explore as Guest
      </button>
    </div>
  );
};
