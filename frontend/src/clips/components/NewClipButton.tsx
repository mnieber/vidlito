import { observer } from 'mobx-react-lite';
import { ClipT, createClip } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon, mainButton } from 'src/frames/components';
import { lvi } from 'src/frames/components/Lvi';
import { ClipsPageEventsT, usePageEventHandler } from 'src/frames/pages';
import { cn } from 'src/utils/classnames';
import './NewClipButton.scss';

export type PageEventsT = ClipsPageEventsT;

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipsAddition,
};

export const NewClipButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const pageEvents = usePageEventHandler<PageEventsT>();

    return (
      <button
        className={cn('NewClipButton', mainButton, props.className)}
        onClick={() => {
          props.clipsAddition.add(createClip({})).then((localClip: ClipT) => {
            pageEvents.userHighlightsClip(localClip.slug);
          });
        }}
      >
        <Icon className={cn(lvi.leadingIcon)} name="plus" />
        New Clip
      </button>
    );
  }, DefaultProps)
);
