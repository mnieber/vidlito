import { DialogButtonS } from '/src/frames/components/DialogButton';
import { L } from '/src/frames/layout';
import { navToHome } from '/src/frames/navEvents';
import { cn } from '/src/utils/classnames';

// Import styles
import './SignInLogo.scss';

export type PropsT = {};

export const SignInLogo = (props: PropsT) => {
  return (
    //
    // 🔳🔳 SignInLogo__SubTitle
    //
    <div className={cn('SignInLogo', L.col.skewer())}>
      <div className={cn('SignInLogo__Title', [L.row.banner()])}>
        <div className={cn('SignInLogo__TitlePrefix')}>vid</div>
        <div className={cn('SignInLogo__TitleSuffix')}>lito</div>
      </div>
      {
        //
        // 🔳🔳 SignInLogo__SubTitle
        //
      }
      <div className={cn(cn('SignInLogo__SubTitle', ['mb-8']))}>
        Manage your lists of videos
      </div>
      {
        //
        // 🔳🔳 SignInLogo__ExploreAsGuestButton
        //
      }
      <button
        className={cn(
          'SignInLogo__ExploreAsGuestButton',
          DialogButtonS.padding.medium()
        )}
        onClick={() => navToHome()}
      >
        Explore as Guest
      </button>
    </div>
  );
};
