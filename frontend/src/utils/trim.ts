import * as R from 'ramda';
import { cn } from '/src/utils/classnames';
import { ObjT, RecursivePartial } from '/src/utils/types';

const modeCnSymbol = Symbol('modeClassnames');
const patchedModeSymbol = Symbol('patchedMode');

export type ModeT<TrimT extends ObjT> = TrimT['base'];
export type ModePatchT<TrimT extends ObjT> = RecursivePartial<ModeT<TrimT>>;

export type ModePatchMapT<TrimT extends ObjT> = {
  [modeName: string]: ModePatchT<TrimT>;
};

export function createTrim<TrimT extends ObjT>(
  trim: TrimT,
  patchMap: ModePatchMapT<TrimT>
): TrimT {
  return R.mergeDeepRight(trim, patchMap) as unknown as TrimT;
}

export const getModeCn = <T extends ObjT>(props?: T) => {
  if (!props) {
    return undefined;
  }

  if (!(props as any)[modeCnSymbol]) {
    (props as any)[modeCnSymbol] = cn(R.values(props ?? {}));
  }
  return (props as any)[modeCnSymbol];
};

export function getMode<TrimT extends ObjT>(
  trim: TrimT,
  flags: ObjT
): ModeT<TrimT> {
  for (const [modeName, isInMode] of Object.entries(flags)) {
    if (isInMode) {
      return patchMode(trim, modeName);
    }
  }
  return trim.base;
}

export function patchMode<TrimT extends ObjT>(
  patchMap: ModePatchMapT<TrimT>,
  modeName: string
): ModeT<TrimT> {
  const patch = (patchMap[modeName] = patchMap[modeName] ?? {});
  if (!(patch as any)[patchedModeSymbol]) {
    (patch as any)[patchedModeSymbol] = R.mergeDeepRight(patchMap.base, patch);
  }
  return (patch as any)[patchedModeSymbol];
}
