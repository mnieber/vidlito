import { action, makeObservable, observable } from 'mobx';
import { useBuilder } from '/src/utils/hooks';
import { ObjT } from '/src/utils/types';

export type MutationStatusT = 'idle' | 'loading' | 'success' | 'error';

export type ArgsT = {
  mutationFn: (args: any) => Promise<any> | void;
  onMutate?: (args: any) => Promise<any> | void;
  onSuccess?: (response: ObjT, args: any) => Promise<any> | void;
  onError?: (args: any) => void;
};

export class ObservableMutation {
  status = 'idle';
  mutationFn: (args: any) => Promise<any> | void;
  onMutate?: (args: any) => Promise<any> | void;
  onSuccess?: (response: ObjT, args: any) => Promise<any> | void;
  onError?: (args: any) => void;

  setStatus = (status: MutationStatusT) => {
    this.status = status;
  };

  mutateAsync = (args: any) => {
    this.setStatus('loading');
    return Promise.resolve(this.onMutate ? this.onMutate(args) : undefined)
      .then(() => this.mutationFn(args))
      .then((response: any) => {
        this.setStatus('success');
        if (this.onSuccess) this.onSuccess(response, args);
        return response;
      })
      .catch((error: any) => {
        this.setStatus('error');
        if (this.onError) this.onError(error);
        return error;
      });
  };

  constructor(args: ArgsT) {
    this.mutationFn = args.mutationFn;
    this.onSuccess = args.onSuccess;
    this.onError = args.onError;

    makeObservable(this, {
      status: observable,
      setStatus: action,
    });
  }
}

export const isRunning = (observableMutation: ObservableMutation) => {
  return observableMutation.status === 'loading';
};

export const useObservableMutation = (args: ArgsT) => {
  return useBuilder(() => new ObservableMutation(args));
};
