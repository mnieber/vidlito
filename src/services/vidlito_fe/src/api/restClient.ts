import axios from 'axios';
import { getCsrfToken } from '/src/api/utils/getCsrfToken';

// The client of the allauth endpoints of the backend. Vite proxies /api/ to the
// backend, so that the session cookie works and there is no CORS.
const hostUrl = '/api/';

const csrfHeaders = () => ({ 'X-CSRFToken': getCsrfToken() });

export function authGet(query: string) {
  return axios.get(`${hostUrl}${trimLeadingSlash(query)}`);
}

export function authPost(query: string, variables: any) {
  return axios.post(`${hostUrl}${trimLeadingSlash(query)}`, variables, {
    headers: csrfHeaders(),
  });
}

export function authDelete(query: string) {
  return axios.delete(`${hostUrl}${trimLeadingSlash(query)}`, {
    headers: csrfHeaders(),
  });
}

function trimLeadingSlash(query: string) {
  return query.startsWith('/') ? query.substring(1) : query;
}
