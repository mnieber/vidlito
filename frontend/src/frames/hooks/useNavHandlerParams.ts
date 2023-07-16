import { observable, runInAction } from 'mobx';
import React from 'react';
import { useParams } from 'react-router-dom';
import { navHandler } from '/src/navHandler/NavHandler';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { ObjT } from '/src/utils/types';

export const useNavHandlerParams = (): ObjT => {
  // The use of useParams() is a bit of a hack. We need it to force a
  // re-render when the route changes.
  const routeParams: ObjT = useParams();

  // Here we copy the navHandler params into an observable object.
  const params = useBuilder(() =>
    observable({ ...navHandler.getParams() })
  ) as ObjT;
  React.useEffect(() => {
    runInAction(() => {
      for (const [key, value] of Object.entries(navHandler.getParams())) {
        params[key] = value;
      }
    });
  });

  // Return the observable object
  return params ?? routeParams;
};
