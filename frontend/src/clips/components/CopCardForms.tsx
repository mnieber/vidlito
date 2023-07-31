import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { CopDescription } from '/src/clips/components/CopDescription';
import { CopPd } from '/src/clips/components/CopPd';
import { CardS } from '/src/frames/components/Card';
import { CopSettings } from '/src/playlists/components/CopSettings';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopCardForms.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.playlist,
  ...dps.clips,
  ...dps.clip,
  ...dps.dashboardState,
  ...dps.isOwner,
};

export const CopCardForms = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const separator = ['my-4', 'border-t border-gray-300'];
    const noClips = !props.clips.length && !isLoading(props.clips);
    const showPlaylist =
      props.dashboardState.panelState.showPlaylistView || noClips;
    const cop = showPlaylist ? props.playlist : props.clip;

    return (
      <div
        className={cn(CardS.size.medium(), 'CopCardForms', [props.className])}
      >
        <CopDescription showPlaylist={showPlaylist} className="" />
        {!cop?.isTransient && (
          <>
            <div className={cn(separator)} />
            <CopPd showPlaylist={showPlaylist} className="" />
          </>
        )}
        {props.isOwner(cop) && !cop?.isTransient && (
          <>
            <div className={cn(separator)} />
            <CopSettings className="" showPlaylist={showPlaylist} />
          </>
        )}
      </div>
    );
  }, DefaultProps)
);
