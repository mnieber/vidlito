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
    const ufn = this.routeUfns.actions(this.history.push);
    const params = this.getParams(true);
    ufn(this.username, params.playlistSlug);
  }

  @action closeActions() {
    const ufn = this.routeUfns.clip(this.history.push);
    const params = this.getParams(true);
    ufn(params.ownerUsername, params.playlistSlug, params.clipSlug);
  }

  @action userHighlightsPlaylist(playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const params = this.getParams();
    if (params.ownerUsername) {
      const ufn = this.routeUfns.playlist(this.history.push);
      ufn(params.ownerUsername, playlistSlug);
    }
  }

  @action userHighlightsClip(clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const params = this.getParams();
    if (params.ownerUsername && params.playlistSlug) {
      const ufn = this.routeUfns.clip(this.history.push);
      ufn(params.ownerUsername, params.playlistSlug, clipSlug);
    }
  }

  clipHighlightIsCorrectedTo(clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    if (this.isOnMainPage()) {
      const params = this.getParams();
      if (params.ownerUsername && params.playlistSlug) {
        const ufn = this.routeUfns.clip(this.history.push);
        ufn(params.ownerUsername, params.playlistSlug, clipSlug);
      }
    }
  }

  playlistHighlightIsCorrectedTo(playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    if (this.isOnMainPage()) {
      const params = this.getParams();
      if (params.ownerUsername) {
        const ufn = this.routeUfns.playlist(this.history.push);
        ufn(params.ownerUsername, playlistSlug);
      }
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
