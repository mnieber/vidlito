import * as R from 'ramda';
import { matchPath } from 'react-router-dom';
import { NavPageT } from '/src/navHandler/NavHandler';
import { ObjT } from '/src/utils/types';

export function sortNavPages(layers: NavPageT[], pathname: string): NavPageT[] {
  type ResultT = {
    layer: NavPageT;
    match: ObjT | undefined;
  };

  let result: ResultT[] = [];
  for (const layer of layers) {
    const match =
      matchPath(pathname, {
        path: layer.route,
        strict: false,
      }) ?? undefined;
    result.push({ layer, match });
  }

  const nrMatchingParams = (match: ObjT | undefined) =>
    R.keys(match?.params ?? {}).length;

  result =
    R.sort((lhs: ResultT, rhs: ResultT) => {
      const lhsScore = nrMatchingParams(lhs.match);
      const rhsScore = nrMatchingParams(rhs.match);
      return (
        lhsScore > rhsScore || (lhsScore === rhsScore && lhs.match?.isExact)
      );
    }, result) ?? undefined;

  return R.map((result: ResultT) => result.layer, result);
}
