import * as R from 'ramda';
import { EndpointData } from 'src/api/EndpointData';
import {
  initRS,
  isLoading,
  isUpdating,
  ResourceStateT,
  setState,
  symbolRS,
} from 'src/api/ResourceState';

export type ArgsT = {
  resource: any;
  sources: any[];
  debugLabel?: string;
};

export const cloneAndSetState = (args: ArgsT) => {
  const groupLabel = args.debugLabel
    ? `cloneAndSetState(${args.debugLabel})`
    : undefined;
  let result = undefined;

  if (groupLabel) {
    console.group(groupLabel);
    if (args.resource === undefined) {
      (console as any).log('resource is undefined');
    }
  }

  if (args.resource === null) {
    if (groupLabel) {
      (console as any).log('resource is null');
    }
    result = args.resource;
  } else {
    let resultState: ResourceStateT = undefined;

    for (const source of args.sources) {
      let [[srcState, srcLabel], srcRes] = source;

      if (srcRes === undefined) {
        // We allow the caller to pass in undefined sources. This is convenient
        // in cases where the source must be enabled or disabled with a flag.
        continue;
      }

      if (srcRes instanceof EndpointData) {
        const endpoint = srcRes;
        srcRes = initRS({});
        srcLabel = srcLabel ?? endpoint.toString();

        const isEndpointLoading =
          endpoint.status === 'loading' ||
          (endpoint.status === 'idle' && srcState === 'loading');
        setState(srcRes, isEndpointLoading ? srcState : 'ready');
      }

      if (srcState === 'loading' && isLoading(srcRes)) {
        resultState = srcState;
        groupLabel && (console as any).log(`source ${srcLabel} is loading`);
        break;
      }

      if (srcState === 'updating' && isUpdating(srcRes)) {
        resultState = srcState;
        groupLabel && (console as any).log(`source ${srcLabel} is updating`);
        break;
      }
    }

    if (R.isNil(args.resource)) {
      result = resultState === 'loading' ? null : undefined;
    } else {
      // Check if the existing resource is loading or updating. In that case,
      // the state of the existing resource takes precedence.
      const currentState = (args.resource as any)[symbolRS];
      if (currentState === 'loading' || currentState === 'updating') {
        groupLabel &&
          (console as any).log(`Resource itself is ${currentState}`);
        resultState = currentState;
      }

      // Clone the resource
      result = Array.isArray(args.resource)
        ? [...args.resource]
        : { ...args.resource };
      (result as any)[symbolRS] = resultState;
    }

    groupLabel && (console as any).log('resultState', resultState);
  }

  if (groupLabel) {
    console.groupEnd();
  }

  return result;
};
