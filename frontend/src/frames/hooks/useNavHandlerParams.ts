import { useParams } from 'react-router-dom';
import { navHandler } from '/src/navHandler/NavHandler';
import { ObjT } from '/src/utils/types';

export const useNavHandlerParams = (): ObjT => {
  // The use of useParams() is a bit of a hack. We need it to force a
  // re-render when the route changes.
  const routeParams: ObjT = useParams();
  return navHandler.getParams() ?? routeParams;
};
