import { DefaultAuthNavHandler } from '/src/auth/routes';
import { DefaultDashboardNavHandler } from '/src/dashboard/routes';
import { NavHandler } from '/src/routes/navHandler';

export const createNavHandler = () => {
  const navHandler = new NavHandler();
  navHandler.installDefaultNavHandler(new DefaultAuthNavHandler());
  navHandler.installDefaultNavHandler(new DefaultDashboardNavHandler());
  return navHandler;
};
