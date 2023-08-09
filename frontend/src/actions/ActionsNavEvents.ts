import { navHandler } from '/src/navHandler/NavHandler';

export const navToActions = (username: string): void =>
  navHandler.getNavFn('navToActions', navToActions)(username);
