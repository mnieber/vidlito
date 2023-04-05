import { useQuery } from '@tanstack/react-query';
import { doQuery, getRefreshToken, setToken } from 'src/api/graphqlClient';
import { refreshToken } from 'src/auth/endpoints/refreshToken';
import { ObjT } from 'src/utils/types';

export class Anonymous {}
export const anonymous = new Anonymous();

export type ArgsT = {
  maybeRefreshToken: boolean;
};

export function loadUserId(args: ArgsT): Promise<any> {
  return doQuery(
    `query {
        username
        getUserProfile {
          userProfile {
            username
            userId
            playlistSet {
              id
              name
              slug
            }
          }
        }
      }`,
    {}
  )
    .then((response: ObjT) => {
      response.getUserProfile.userProfile?.playlistSet.forEach(
        (playlist: ObjT) => {
          playlist.clipSet = [];
        }
      );

      return {
        userId: response.username ?? anonymous,
        isAuthenticated: !!response.username,
        // Since null is used to indicate a loading state, we convert to undefined
        userProfile: response.getUserProfile.userProfile ?? undefined,
      };
    })
    .catch((error: ObjT) => {
      const message = error.response.errors[0].message;
      if (
        ['Signature has expired', 'Error decoding signature'].includes(
          message
        ) &&
        getRefreshToken() &&
        args.maybeRefreshToken
      ) {
        // Try to refresh the token. Regardless of whether that worked, retry the
        // loadUserId, but this time with maybeRefreshToken set to false.
        return refreshToken().finally(() =>
          loadUserId({ maybeRefreshToken: false })
        );
      }

      // If we get here, then there was an unresolvable problem with the auth tokens,
      // and we've already tried to refresh them. In that case, clear the tokens and
      // throw an error.
      setToken(undefined, undefined);
      throw new Error(message);
    })
    .catch(() => {
      return {
        userId: anonymous,
        isAuthenticated: false,
      };
    });
}

export const useLoadUserId = () => {
  return useQuery({
    queryKey: ['loadUserId'],
    queryFn: () => {
      return loadUserId({ maybeRefreshToken: true });
    },
  });
};
