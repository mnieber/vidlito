import { getNavFn } from '/src/navHandler/NavHandler';

export const navToActions = (username: string): void =>
  getNavFn('navToActions', navToActions)(username);
