import { GraphQLClient } from 'graphql-request';

export const graphqlHostUrl = window.location.host.startsWith('localhost')
  ? import.meta.env.VITE_LOCALHOST_API_ENDPOINT
  : import.meta.env.VITE_BACKEND_API_ENDPOINT ?? '';

function _createClient() {
  if (!graphqlHostUrl) throw Error('No graphql endpoint was configured');

  const accessToken = getAccessToken();
  return new GraphQLClient(graphqlHostUrl, {
    headers: accessToken
      ? {
          Authorization: 'JWT ' + accessToken,
        }
      : {},
  });
}

export const setAuthTokens = (
  accessToken: string | undefined,
  refreshToken?: string
) => {
  if (accessToken === undefined) {
    localStorage.removeItem('accessToken');
  } else {
    localStorage.setItem('accessToken', accessToken);
  }
  if (refreshToken === undefined) {
    localStorage.removeItem('refreshToken');
  } else {
    localStorage.setItem('refreshToken', refreshToken);
  }
  _graphqlClient = _createClient();
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export function doQuery(query: string, variables: any) {
  return graphqlClient().request(query, variables);
}

let _graphqlClient = _createClient();

export const graphqlClient = () => _graphqlClient;
