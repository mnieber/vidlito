import { GraphQLClient } from 'graphql-request';
import { getCsrfToken } from '/src/api/utils/getCsrfToken';

// Vite proxies /graphql/ to the backend. The browser sends the session cookie, which
// authenticates the request, and the backend checks the CSRF token.
const graphqlUrl = `${window.location.origin}/graphql/`;

const graphqlClient = new GraphQLClient(graphqlUrl, {
  credentials: 'same-origin',
});

let onRequestFailed = (error: any) => {};

// Sets the function that is called when a request fails, e.g. to find out whether
// the session has expired.
export const setOnRequestFailed = (callback: (error: any) => void) => {
  onRequestFailed = callback;
};

export function doQuery(query: string, variables: any) {
  return graphqlClient
    .request(query, variables, { 'X-CSRFToken': getCsrfToken() })
    .catch((error: any) => {
      onRequestFailed(error);
      throw error;
    });
}
