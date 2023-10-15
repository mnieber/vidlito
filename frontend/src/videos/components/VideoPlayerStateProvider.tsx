import { comparer } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { withContextProps } from 'react-props-from-context';
import { flags } from '/src/app/flags';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { createGetProps } from '/src/utils/createGetProps';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { log } from '/src/utils/logging';
import { VideoPlayerState } from '/src/videos/VideoPlayerState';
import { VideoPlayerContext } from '/src/videos/hooks/useVideoPlayerContext';

export type PropsT = React.PropsWithChildren<{}>;

const ContextProps = {
  clip: clipsCtx.clip,
};

export const VideoPlayerStateProvider = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const videoPlayerState = useBuilder(() => new VideoPlayerState({}));
    React.useEffect(() => () => videoPlayerState.destroy(), [videoPlayerState]);

    useUpdateStateReaction({
      getInputs: () => ({
        clip: props.clip,
        url: props.clip?.url,
        startTimeMs: props.clip?.startTimeMs ?? 0,
      }),
      updateState: (inputs) => {
        if (!R.isNil(inputs.clip)) {
          videoPlayerState.setUrl(inputs.url ?? '', inputs.startTimeMs);
          if (flags.logStateProviders) {
            log('VideoPlayerState updated', videoPlayerState.getSummary());
          }
        }
      },
      equals: comparer.structural,
    });

    const getVideoPlayerContext = () => {
      return createGetProps(
        R.mergeAll([
          {
            videoPlayerState: () => videoPlayerState,
            videoController: () => videoPlayerState.videoController,
          },
        ])
      );
    };

    return (
      <VideoPlayerContext.Provider value={getVideoPlayerContext()}>
        {props.children}
      </VideoPlayerContext.Provider>
    );
  }, ContextProps)
);
