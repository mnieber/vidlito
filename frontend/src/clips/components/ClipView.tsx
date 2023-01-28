import { observer } from 'mobx-react-lite';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipKeyHandler } from 'src/clips/components/ClipKeyHandler';
import { cn } from 'src/utils/classnames';
import { VideoPlayerPanel } from 'src/videos/components/VideoPlayerPanel';
import { useVideoPlayerState } from 'src/videos/hooks';
import './ClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
};

export const ClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const parentElmRef = React.useRef<HTMLDivElement>(null);
    const videoPlayerState = useVideoPlayerState({
      clip: props.clip,
      parentElmRef,
    });

    return (
      <ClipKeyHandler videoPlayerState={videoPlayerState}>
        <div
          className={cn('ClipView', props.className)}
          ref={parentElmRef}
          tabIndex={123}
        >
          <VideoPlayerPanel videoPlayerState={videoPlayerState} className={cn('mb-2')}/>
          <div className={cn('ClipView__Description')}>
            <ReactMarkdown>{props.clip.description ?? ''}</ReactMarkdown>
          </div>
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
