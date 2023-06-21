import { getNavFn } from '/src/navHandler/NavHandler';

export const navGoToActions = (): void =>
  getNavFn('goToActions', navGoToActions)();
