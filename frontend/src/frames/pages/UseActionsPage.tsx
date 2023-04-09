import { useRouteMatch } from 'react-router-dom';
import { PageEventHandler, useInstallEventHandlers } from 'src/pageEvents';
import { PageEventLayer } from 'src/pageEvents/PageEventHandler';

export type ActionsPageEventHandlerT = {};

class ActionsPageEventHandler
  extends PageEventLayer
  implements ActionsPageEventHandlerT
{
  clipHighlightIsCorrectedTo(this: PageEventHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
  }
}

export type PropsT = React.PropsWithChildren<{}>;

export const UseActionsPage = (props: PropsT) => {
  const routeMatch = useRouteMatch();
  useInstallEventHandlers(
    'ActionsPageEventHandler',
    routeMatch.path,
    ActionsPageEventHandler
  );
  return <>{props.children}</>;
};
