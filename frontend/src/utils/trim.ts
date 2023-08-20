import * as R from 'ramda';
import { cn } from '/src/utils/classnames';
import { ObjT, RecursivePartial } from '/src/utils/types';

export function createTrim<T extends ObjT>(
  componentName: string,
  trim: T,
  patch: RecursivePartial<T>
): T {
  return R.mergeDeepRight(trim, { ...patch, componentName }) as unknown as T;
}

export const trimLeafToCn = <T extends ObjT>(props?: T) =>
  cn(R.values(props ?? {}));
