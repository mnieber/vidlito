import { FramesPageEventsT, PageEventHandler } from 'src/frames/pages';
import { withPageEventHandlers } from 'src/pageEvents';

export type FramesPageEventHandlerT = FramesPageEventsT;

export const FramesPageEventHandler: FramesPageEventHandlerT = {
  goToHome(this: PageEventHandler) {},
  userSignedInOrOut(this: PageEventHandler, username?: string) {
    this.hiddenParams.username = username;
  },
};

export const UseFramesPage = withPageEventHandlers({
  layerName: 'FramesPageEventHandler',
  eventHandlers: FramesPageEventHandler,
});
