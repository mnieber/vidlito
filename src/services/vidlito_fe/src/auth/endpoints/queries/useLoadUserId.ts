import { useQuery } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { authGet } from '/src/api/restClient';
import { authUrl, SessionSchema } from '/src/api/utils/allauth';
import { createQueryKey } from '/src/utils/createQueryKey';
import { ObjT } from '/src/utils/types';

export class Anonymous {}
export const anonymous = new Anonymous();

// Returns the email address of the signed in user, or undefined. Loading the session
// also sets the CSRF cookie, which the next writes need.
export function loadSessionUserId(): Promise<string | undefined> {
  return authGet(`${authUrl}/session`).then(
    (response) => SessionSchema.parse(response.data).data.user.email,
    (error: any) => {
      // A 401 means that nobody is signed in
      if (error.response?.status === 401) return undefined;
      throw error;
    }
  );
}

function loadUserProfile() {
  return doQuery(
    `query {
        getUserProfile {
          userProfile {
            username
            folderSet {
              id
              name
            }
            followSet {
              id
              name
              slug
              ownerUsername
            }
          }
        }
      }`,
    {}
  ).then((response: ObjT) => {
    const userProfile = response.getUserProfile.userProfile;
    userProfile?.followSet.forEach((playlist: ObjT) => {
      playlist.clipSet = [];
    });
    // Since null is used to indicate a loading state, we convert to undefined
    return userProfile ?? undefined;
  });
}

export function loadUserId(): Promise<any> {
  return loadSessionUserId()
    .then((userId) => {
      if (!userId) {
        return { userId: anonymous, isAuthenticated: false };
      }
      return loadUserProfile().then((userProfile) => ({
        userId,
        isAuthenticated: true,
        userProfile,
      }));
    })
    .catch(() => {
      return {
        userId: anonymous,
        isAuthenticated: false,
      };
    });
}

export type QueryKeyT = {};

export function queryKey(args: QueryKeyT) {
  return createQueryKey<QueryKeyT>('loadUserId', args);
}

export const useLoadUserId = () => {
  return useQuery({
    queryKey: queryKey({}),
    queryFn: () => {
      return loadUserId();
    },
  });
};

export const invalidateLoadUserId = (args: QueryKeyT) => {
  return queryClient.invalidateQueries({
    queryKey: queryKey(args),
  });
};
