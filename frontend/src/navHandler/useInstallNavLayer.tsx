import React from 'react';
import { NavHandler } from './NavHandler';
import { useNavHandler } from './useNavHandler';
import { NavLayer } from '/src/navHandler/NavHandler';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type CreateNavLayerFunctionT = (name: string, route: string) => NavLayer;

export function useInstallNavLayer(
  name: string,
  path: string,
  createNavLayer: CreateNavLayerFunctionT
) {
  const navHandler = useNavHandler<NavHandler>();
  const navLayer = useBuilder(() => createNavLayer(name, path));

  React.useEffect(() => {
    navHandler.installNavLayer(navLayer);
    return () => {
      navHandler.uninstallNavLayer(navLayer.name);
    };
  }, [navHandler, navLayer]);
}
