import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './SignInLogo.scss';

export type PropsT = {};

export const SignInLogo = (props: PropsT) => {
  return (
    //
    // 🔳🔳 SignInLogo__SubTitle
    //
    <div className={cn('SignInLogo', L.col.banner())}>
      <div
        className={cn(
          'SignInLogo__Title__',
          'text-6xl font-bold',
          //
          //
          L.row.banner()
        )}
      >
        <div
          className={cn(
            'SignInLogo__TitlePrefix__',
            `text-primaryBlue`
            //
            //
          )}
        >
          vid
        </div>
        <div
          className={cn(
            'SignInLogo__TitleSuffix__',
            `text-primaryTeal`
            //
            //
          )}
        >
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
          cn(
            'SignInLogo__SubTitle__',
            'text-white tracking-wide',
            //
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
