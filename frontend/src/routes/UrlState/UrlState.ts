import { makeObservable } from 'mobx';
import * as R from 'ramda';
import { cleanUpCtr } from 'react-default-props-context';
import { getHomeRoute } from 'src/routes/getHomeRoute';
import { getBestRouteMatch } from 'src/routes/utils/getRouteMatches';
import { ObjT } from 'src/utils/types';
import { pathname } from 'src/utils/urls';

export type PropsT = {
  history: any;
  routes: ObjT;
  routeUfns: ObjT;
};

export class UrlState {
  history: any;
  routes: ObjT;
  routeUfns: ObjT;
  hiddenParams: ObjT = {};
  username?: string;

  getSummary() {
    return {};
  }

  destroy() {
    cleanUpCtr(this);
  }

  goBack() {
    this.history.goBack();
  }

  getRouteMatch() {
    return getBestRouteMatch(this.routes, pathname());
  }

  updateHiddenParams() {
    this.hiddenParams = R.mergeLeft(this.hiddenParams, this.getParams());
  }

  getParams(mergeLeftWithHiddenParams = false) {
    const params = this.getRouteMatch()?.params ?? {};
    return mergeLeftWithHiddenParams
      ? R.mergeLeft(params, this.hiddenParams)
      : params;
  }

  getPlaylistSlug() {
    const params = this.getParams();
    return params.playlistSlug;
  }

  goHome() {
    this.history.push(getHomeRoute());
  }

  constructor(props: PropsT) {
    this.history = props.history;
    this.routes = props.routes;
    this.routeUfns = props.routeUfns;
    makeObservable(this);
  }
}
