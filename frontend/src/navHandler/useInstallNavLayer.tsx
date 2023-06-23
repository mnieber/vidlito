import React from 'react';
import { navHandler } from '/src/navHandler/NavHandler';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { ObjT } from '/src/utils/types';

export function useInstallNavLayer(name: string, path: string, navFns: ObjT) {
  const navLayer = useBuilder(() => {
    return {
      name: name,
      route: path,
      fns: navFns,
    };
  });

  React.useEffect(() => {
    navHandler.installNavLayer(navLayer);
    return () => {
      navHandler.uninstallNavLayer(navLayer.name);
    };
  }, [navHandler, navLayer]);
}
