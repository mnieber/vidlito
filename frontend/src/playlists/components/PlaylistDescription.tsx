import { observer } from 'mobx-react-lite';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { MarkdownView } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './PlaylistDescription.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const PlaylistDescription = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'PlaylistDescription',
          'pt-[18px] pb-[1px] px-4',
          '',
          'bg-gray-100 text-gray-700',
          'rounded-lg',
          props.className
        )}
      >
        <MarkdownView
          text={
            props.playlist.description ||
            playlistDefaultDescription(props.playlist)
          }
        />
      </div>
    );
  }, DefaultProps)
);

const playlistDefaultDescription = (playlist: PlaylistT) => {
  return `# Welcome to the playlist description!\nsaid principal among complete market follow fence column film science possible frog how golden knife he border dead twelve union control eager better troops face outside cat someone beneath feel stop route composed or machine forest listen string cage wife sleep child story cannot felt explore four sale`;
};
