import { navHandler } from 'react-nav-handler';

export const navToSearch = (): void =>
  navHandler.getNavFn('navToSearch', navToSearch)();
