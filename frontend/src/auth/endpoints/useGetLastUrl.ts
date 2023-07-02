import { doQuery } from '/src/api/graphqlClient';
import { ObjT } from '/src/utils/types';

export class Anonymous {}
export const anonymous = new Anonymous();

export type ArgsT = {};

export function getLastUrl(args: ArgsT): Promise<any> {
  return doQuery(
    `query {
        getUserProfile {
          userProfile {
            lastUrl
          }
        }
      }`,
    {}
  ).then((response: ObjT) => {
    return {
      lastUrl: response.getUserProfile.userProfile?.lastUrl,
    };
  });
}
