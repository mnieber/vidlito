import { comparer } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { DefaultPropsProvider } from 'react-default-props-context';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { flags } from '/src/app/flags';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { log } from '/src/utils/logging';
import { VideoPlayerState } from '/src/videos/VideoPlayerState';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.clip,
};

export const VideoPlayerStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          videoPlayerState: () => videoPlayerState,
          videoController: () => videoPlayerState.videoController,
        },
      };

      return result;
    };

    return (
      <DefaultPropsProvider extend value={getDefaultPropsContext()}>
        {props.children}
      </DefaultPropsProvider>
    );
  }, DefaultProps)
);
