import { useRouteMatch } from 'react-router-dom';
import { navCorrectClipSlugUrlParam } from '/src/clips/ClipsNavEvents';
import { useInstallNavLayer } from '/src/navHandler';
import { navHandler } from '/src/navHandler/NavHandler';

export const createActionsNavEventLayer = () => {
  return {
    correctClipSlugUrlParam: ((clipSlug: string) => {
      navHandler.hiddenParams.clipSlug = clipSlug;
    }) as typeof navCorrectClipSlugUrlParam,
  };
};

export type PropsT = React.PropsWithChildren<{}>;

export const UseActionsPage = (props: PropsT) => {
  const routeMatch = useRouteMatch();
  useInstallNavLayer(
    'ActionsNavEventLayer',
    routeMatch.path,
    createActionsNavEventLayer()
  );
  return <>{props.children}</>;
};
