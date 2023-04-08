import { action, makeAutoObservable } from 'mobx';
import { addSource } from 'src/resourceStates/addAndRemoveSource';
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
};

export const trackPromise = (args: ArgsT) => {
  const tracker: TrackerT = makeAutoObservable({
    isRunning: true,
    data: null,
    id: createUUID(),
    result: Promise.resolve(),
  });

  const removeSource = addSource(
    args.resourcesToUpdate ?? [],
    'updating',
    () => tracker.isRunning,
    `${args.name}_${createUUID()}`
  );

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
