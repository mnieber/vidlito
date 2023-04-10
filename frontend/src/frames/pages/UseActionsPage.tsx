import { useRouteMatch } from 'react-router-dom';
import { UrlEventHandler, useInstallEventHandlers } from 'src/urlEvents';
import { UrlEventLayer } from 'src/urlEvents/UrlEventHandler';

export type ActionsUrlEventHandlerT = {};

class ActionsUrlEventHandler
  extends UrlEventLayer
  implements ActionsUrlEventHandlerT
{
  clipHighlightIsCorrectedTo(this: UrlEventHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
  }
}

export type PropsT = React.PropsWithChildren<{}>;

export const UseActionsPage = (props: PropsT) => {
  const routeMatch = useRouteMatch();
  useInstallEventHandlers(
    'ActionsUrlEventHandler',
    routeMatch.path,
    ActionsUrlEventHandler
  );
  return <>{props.children}</>;
};
