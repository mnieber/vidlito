import React from 'react';
import { navHandler } from '/src/navHandler/NavHandler';
import { ObjT } from '/src/utils/types';

export function useInstallNavLayer(name: string, path: string, navFns: ObjT) {
  const navLayer = {
    name: name,
    route: path,
    fns: navFns,
  };

  React.useEffect(() => {
    navHandler.installNavLayer(navLayer);
    return () => {
      navHandler.uninstallNavLayer(navLayer.name);
    };
  }, [navHandler, navLayer]);
}
