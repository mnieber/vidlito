import { EndpointData } from 'src/api/EndpointData';
import { ObjT } from 'src/utils/types';

export class MutationData extends EndpointData {
  mutation: ObjT = {};
  mutateAsync: Function = () => {};

  public toString = (): string => {
    return `MutationData`;
  };
}

export const isRunning = (mutation: MutationData) => {
  return mutation.status === 'loading';
};
