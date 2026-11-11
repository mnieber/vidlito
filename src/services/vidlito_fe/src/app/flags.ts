import { observable } from 'mobx';

export const flags = observable({
  logHistory: false,
  logQueries: false,
  logResourceStates: false,
  logSkandha: false,
  logStateProviders: false,
});
