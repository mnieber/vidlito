import { observable } from 'mobx';

export const flags = observable({
  logQueries: false,
  logSkandha: false,
  logStateProviders: true,
});
