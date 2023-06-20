import { useRouteMatch } from 'react-router-dom';
import { NavHandler, useInstallNavLayer } from '/src/navHandler';
import { NavLayer } from '/src/navHandler/NavHandler';

export type ActionsNavEventLayerT = {};

class ActionsNavEventLayer extends NavLayer implements ActionsNavEventLayerT {
  correctClipSlugUrlParam(this: NavHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
  }
}

export type PropsT = React.PropsWithChildren<{}>;

export const UseActionsPage = (props: PropsT) => {
  const routeMatch = useRouteMatch();
  useInstallNavLayer(
    'ActionsNavEventLayer',
    routeMatch.path,
    (name: string, route: string) => new ActionsNavEventLayer(name, route)
  );
  return <>{props.children}</>;
};
