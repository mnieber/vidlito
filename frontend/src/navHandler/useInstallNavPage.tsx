import React from 'react';
import { navHandler } from '/src/navHandler/NavHandler';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { ObjT } from '/src/utils/types';

export function useInstallNavPage(name: string, path: string, navFns: ObjT) {
  const navPage = useBuilder(() => {
    const navPage = {
      name: name,
      route: path,
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
