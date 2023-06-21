import { getNavFn } from '/src/navHandler/NavHandler';

export const ActionsNavEvents = {
  goToActions() {},
};

export const navGoToActions = (): void =>
  getNavFn('goToActions', navGoToActions)();
