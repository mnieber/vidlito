import * as R from 'ramda';
import { matchPath } from 'react-router-dom';
import { ObjT } from 'src/utils/types';

export type MatchT = {
  path: string;
  params: ObjT;
};

export function getMatchingRoutes(routes: ObjT, pathname: string): MatchT[] {
  const matchingRoutes = [];
  for (const route of R.values(routes)) {
    const match = matchPath(pathname, {
      path: route(),
      strict: false,
    });
    if (match) {
      matchingRoutes.push(match);
    }
  }
  return matchingRoutes;
}
