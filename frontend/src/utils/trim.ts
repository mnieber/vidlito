import * as R from 'ramda';
import { cn } from '/src/utils/classnames';
import { ObjT, RecursivePartial } from '/src/utils/types';

const trimLeafCnSymbol = Symbol('trimLeafClassnames');
const patchedTrimSymbol = Symbol('patchedTrim');

export type TrimT<TrimsT extends ObjT> = TrimsT['base'];
export type PatchT<TrimsT extends ObjT> = RecursivePartial<TrimT<TrimsT>>;

export type PatchMapT<TrimsT extends ObjT> = {
  [variantName: string]: PatchT<TrimsT>;
};

export function createTrims<TrimsT extends ObjT>(
  componentName: string,
  trims: TrimsT,
  patchMap: PatchMapT<TrimsT>
): TrimsT {
  return R.mergeDeepRight(trims, {
    componentName,
    ...patchMap,
  }) as unknown as TrimsT;
}

export const trimLeafToCn = <T extends ObjT>(props?: T) => {
  if (!props) {
    return undefined;
  }

  if (!(props as any)[trimLeafCnSymbol]) {
    (props as any)[trimLeafCnSymbol] = cn(R.values(props ?? {}));
  }
  return (props as any)[trimLeafCnSymbol];
};

export function getTrim<TrimsT extends ObjT>(
  trims: TrimsT,
  flags: ObjT
): TrimT<TrimsT> {
  for (const [variantName, isUsingVariant] of Object.entries(flags)) {
    if (isUsingVariant) {
      return patchTrim(trims.base, trims, variantName);
    }
  }
  return trims.base;
}

export function patchTrim<TrimsT extends ObjT>(
  baseTrim: TrimT<TrimsT>,
  patchMap: PatchMapT<TrimsT>,
  variantName: string
): TrimT<TrimsT> {
  const patch = (patchMap[variantName] = patchMap[variantName] ?? {});
  if (!(patch as any)[patchedTrimSymbol]) {
    (patch as any)[patchedTrimSymbol] = R.mergeDeepRight(baseTrim, patch);
  }
  return (patch as any)[patchedTrimSymbol];
}
