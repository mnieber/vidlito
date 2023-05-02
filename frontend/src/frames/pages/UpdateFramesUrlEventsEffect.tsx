import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { FramesUrlEventLayerT } from 'src/frames/pages/UseFramesPage';
import { UrlEventHandler } from 'src/urlEvents/UrlEventHandler';
import { useUrlEventHandler } from 'src/urlEvents/useUrlEventHandler';

const useUrlEvents = () =>
  useUrlEventHandler<UrlEventHandler & FramesUrlEventLayerT>();

export type PropsT = {};

const DefaultProps = {
  ...dps.userProfile,
};

export const UpdateFramesUrlEventsEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const urlEvents = useUrlEvents();

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: props.userProfile,
        framesUrlEventLayer: urlEvents.getEventLayer('FramesUrlEventLayer'),
      }),
      updateState: (inputs) => {
        if (inputs.framesUrlEventLayer) {
          urlEvents.userProfileLoaded(inputs.userProfile?.username);
        }
      },
    });

    return null;
  }, DefaultProps)
);
