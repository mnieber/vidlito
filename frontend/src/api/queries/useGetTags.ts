import { doQuery } from '/src/api/graphqlClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  tagPrefix: string;
};

export const getTags = (args: ArgsT) => {
  return args.tagPrefix === ''
    ? Promise.resolve({ getTags: [] })
    : doQuery(
        `query getTags(
      $tagPrefix: String
    ) {
      getTags(
        tagPrefix: $tagPrefix
      ) {
        tags
      }
    }`,
        args
      ).then((response: ObjT) => {
        return wait(import.meta.env.DEV ? 1000 : 0, response.getTags);
      });
};
