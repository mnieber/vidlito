import { makeAutoObservable } from 'mobx';
import { addUpdater } from 'src/resourceStates/addAndRemoveSource';
import { createUUID } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export type TrackerT = {
  isRunning: boolean;
  data: ObjT | null;
  id: string;
  result: Promise<any>;
};

export type ArgsT = {
  promise: Promise<any>;
  name: string;
  resourcesToUpdate?: any[];
  lockResources?: boolean;
};

export const trackPromise = (args: ArgsT) => {
  const tracker: TrackerT = makeAutoObservable({
    isRunning: true,
    data: null,
    id: createUUID(),
    result: Promise.resolve(),
  });

  const removeUpdater = addUpdater(
    args.resourcesToUpdate ?? [],
    () => tracker.isRunning,
    `${args.name}_${createUUID()}`,
    { lock: args.lockResources }
  );

  tracker.result = args.promise
    .then((response: any) => {
      tracker.isRunning = false;
      tracker.data = response;
      removeUpdater();
      return response;
    })
    .catch((error: any) => {
      tracker.isRunning = false;
      removeUpdater();
      throw error;
    });

  return tracker;
};
