import { observable } from 'mobx';

export const flags = observable({
  logQueries: false,
  logResourceView: false,
  logSkandha: false,
  logStateProviders: false,
});
