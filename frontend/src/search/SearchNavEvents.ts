import { navHandler } from '/src/navHandler/NavHandler';

export const navToSearch = (): void =>
  navHandler.getNavFn('navToSearch', navToSearch)();
