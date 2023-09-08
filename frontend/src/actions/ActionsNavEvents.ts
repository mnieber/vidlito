import { navHandler } from 'react-nav-handler';

export const navToActions = (username: string): void =>
  navHandler.getNavFn('navToActions', navToActions)(username);
