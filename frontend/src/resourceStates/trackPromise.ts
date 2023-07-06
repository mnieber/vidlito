import { stub } from 'aspiration';
import { action, makeAutoObservable } from 'mobx';
import { addSource } from '/src/resourceStates/addSource';
import { createUUID } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

export type TrackerT<T> = {
  isRunning: boolean;
  data: ObjT | undefined;
  id: string;
  result: Promise<T>;
};

export type ArgsT<T> = {
  promise: Promise<T>;
  name: string;
  states?: {
    [state: string]: any[];
  };
};

export const trackPromise = <T = any>(args: ArgsT<T>) => {
  const tracker: TrackerT<T> = makeAutoObservable({
    isRunning: true,
    data: undefined,
    id: createUUID(),
    result: stub as Promise<T>,
  });

  const removeSource = addSource({
    states: args.states,
    condition: () => tracker.isRunning,
    name: `${args.name}_${createUUID()}`,
  });

  tracker.result = args.promise
    .then(
      action((response: any) => {
        tracker.isRunning = false;
        tracker.data = response;
        removeSource();
        return response;
      })
    )
    .catch(
      action((error: any) => {
        tracker.isRunning = false;
        removeSource();
        throw error;
      })
    );

  return tracker;
};
