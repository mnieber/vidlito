import { NavHandlerContext } from '/src/navHandler';
import { navHandler } from '/src/navHandler/useNavHandler';

type PropsT = React.PropsWithChildren<{}>;

export const NavHandlerProvider = (props: PropsT) => {
  return (
    <NavHandlerContext.Provider value={navHandler}>
      {props.children}
    </NavHandlerContext.Provider>
  );
};
