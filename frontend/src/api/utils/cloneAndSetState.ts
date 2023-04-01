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
  if (args.resource === null) {
    if (args.debugLabel) {
      console.log(`cloneAndSetState: ${args.debugLabel} - resource is null`);
    }
    return args.resource;
  }

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
      args.debugLabel &&
        console.log(
          `cloneAndSetState: ${args.debugLabel} - source ${srcLabel} is loading`
        );
      break;
    }

    if (srcState === 'updating' && isUpdating(srcRes)) {
      resultState = srcState;
      args.debugLabel &&
        console.log(
          `cloneAndSetState: ${args.debugLabel} - source ${srcLabel} is updating`
        );
      break;
    }
  }

  if (R.isNil(args.resource)) {
    return resultState === 'loading' ? null : undefined;
  }

  // Check if the existing resource is loading or updating. In that case,
  // the state of the existing resource takes precedence.
  const currentState = (args.resource as any)[symbolRS];
  if (currentState === 'loading' || currentState === 'updating') {
    args.debugLabel &&
      console.log(
        `cloneAndSetState: ${args.debugLabel} - currentlyLoadingOrUpdating=true`
      );
    resultState = currentState;
  }

  // Clone the resource
  const result = Array.isArray(args.resource)
    ? [...args.resource]
    : { ...args.resource };
  (result as any)[symbolRS] = resultState;
  return result;
};
