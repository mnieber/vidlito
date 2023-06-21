import { navHandler } from '/src/navHandler/NavHandler';
import { ObjT } from '/src/utils/types';

export function useInstallNavLayer(name: string, path: string, navFns: ObjT) {
  navHandler.installNavLayer({
    name: name,
    route: path,
    fns: navFns,
  });
}
