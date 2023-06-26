import React from 'react';
import { navHandler } from '/src/navHandler/NavHandler';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { ObjT } from '/src/utils/types';

export function useInstallNavLayer(name: string, path: string, navFns: ObjT) {
  const navLayer = useBuilder(() => {
    const navLayer = {
      name: name,
      route: path,
      fns: navFns,
    };
    navHandler.installNavLayer(navLayer);
    return navLayer;
  });

  React.useEffect(() => {
    return () => {
      navHandler.uninstallNavLayer(navLayer.name);
    };
  }, [navHandler, navLayer]);
}
