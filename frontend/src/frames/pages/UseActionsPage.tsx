import { useRouteMatch } from 'react-router-dom';
import { UrlEventHandler, useInstallEventLayer } from '/src/urlEvents';
import { UrlEventLayer } from '/src/urlEvents/UrlEventHandler';

export type ActionsUrlEventLayerT = {};

class ActionsUrlEventLayer
  extends UrlEventLayer
  implements ActionsUrlEventLayerT
{
  clipHighlightIsCorrectedTo(this: UrlEventHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
  }
}

export type PropsT = React.PropsWithChildren<{}>;

export const UseActionsPage = (props: PropsT) => {
  const routeMatch = useRouteMatch();
  useInstallEventLayer(
    'ActionsUrlEventLayer',
    routeMatch.path,
    (name: string, route: string) => new ActionsUrlEventLayer(name, route)
  );
  return <>{props.children}</>;
};
