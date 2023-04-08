import { action, makeObservable } from 'mobx';
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

  isOnMainPage() {
    return ['playlist', 'clip'].includes(this.getRouteMatch()?.name ?? '');
  }

  getPlaylistSlug() {
    const params = this.getParams();
    return params.playlistSlug;
  }

  goHome() {
    this.history.push(getHomeRoute());
  }

  @action goToActions() {
    this.updateHiddenParams();
    const ufn = this.routeUfns.actions(this.history.push);
    ufn({ ...this.getParams(true), ownerUsername: this.username });
  }

  @action closeActions() {
    const ufn = this.routeUfns.clip(this.history.push);
    ufn(this.getParams(true));
  }

  @action userHighlightsPlaylist(playlistSlug: string) {
    const routeMatch = this.getRouteMatch();
    this.hiddenParams.playlistSlug = playlistSlug;
    if (routeMatch && this.isOnMainPage()) {
      const ufn = this.routeUfns[routeMatch.name](this.history.push);
      ufn({ ...this.getParams(true), playlistSlug });
    }
  }

  @action userHighlightsClip(clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const params = this.getParams();
    if (params.ownerUsername && params.playlistSlug) {
      const ufn = this.routeUfns.clip(this.history.push);
      ufn({ ...params, clipSlug });
    }
  }

  clipHighlightIsCorrectedTo(clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    if (this.isOnMainPage()) {
      const ufn = this.routeUfns.clip(this.history.push);
      ufn({ ...this.getParams(), clipSlug });
    }
  }

  playlistHighlightIsCorrectedTo(playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    if (this.isOnMainPage()) {
      const ufn = this.routeUfns.playlist(this.history.push);
      ufn({ ...this.getParams(), playlistSlug });
    }
  }

  userCreatesNewPlaylist() {}

  constructor(props: PropsT) {
    this.history = props.history;
    this.routes = props.routes;
    this.routeUfns = props.routeUfns;
    makeObservable(this);
  }
}
