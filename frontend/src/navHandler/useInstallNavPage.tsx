import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { navHandler } from '/src/navHandler/NavHandler';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { ObjT } from '/src/utils/types';

export function useInstallNavPage(name: string, navFns: ObjT) {
  const routeMatch = useRouteMatch();

  const navPage = useBuilder(() => {
    const navPage = {
      name: name,
      route: routeMatch.path,
      fns: navFns,
    };
    navHandler.installNavPage(navPage);
    return navPage;
  });

  React.useEffect(() => {
    return () => {
      navHandler.uninstallNavPage(navPage.name);
    };
  }, [navHandler, navPage]);
}
