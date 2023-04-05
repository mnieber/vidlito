import { action, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { cleanUpCtr } from 'react-default-props-context';
import { getHomeRoute } from 'src/routes/getHomeRoute';
import { getMatchingRoutes } from 'src/routes/utils/getMatchingRoutes';
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
  @observable playlistSlug?: string;
  @observable playlistOwnerUsername?: string;
  @observable clipSlug?: string;
  @observable urlBeforeGoToActions?: string;

  getSummary() {
    return {};
  }

  destroy() {
    cleanUpCtr(this);
  }

  goBack() {
    this.history.goBack();
  }

  @action setPlaylist(playlistOwnerUsername: string, playlistSlug: string) {
    if (
      this.playlistSlug !== playlistSlug ||
      this.playlistOwnerUsername !== playlistOwnerUsername
    ) {
      this.playlistOwnerUsername = playlistOwnerUsername;
      this.playlistSlug = playlistSlug;
      if (this.isOnMainPage()) {
        const ufn = this.routeUfns.playlist(this.history.push);
        ufn(playlistOwnerUsername, playlistSlug);
      }
    }
  }

  isOnMainPage() {
    return (
      getMatchingRoutes(R.pick(['playlist', 'clip'], this.routes), pathname())
        .length &&
      !getMatchingRoutes(R.pick(['actions'], this.routes), pathname()).length
    );
  }

  setClipSlug(clipSlug: string) {
    if (this.clipSlug !== clipSlug) {
      this.clipSlug = clipSlug;
      if (this.isOnMainPage()) {
        if (!this.playlistSlug) throw new Error('No playlist set');
        const ufn = this.routeUfns.clip(this.history.push);
        ufn(this.playlistOwnerUsername, this.playlistSlug, this.clipSlug);
      }
    }
  }

  goHome() {
    this.playlistSlug = undefined;
    this.history.push(getHomeRoute());
  }

  @action goToActions() {
    this.urlBeforeGoToActions = this.history.location.pathname;
    const ufn = this.routeUfns.actions(this.history.push);
    ufn(this.playlistOwnerUsername, this.playlistSlug);
  }

  @action closeActions() {
    this.history.push(this.urlBeforeGoToActions);
    this.urlBeforeGoToActions = undefined;
  }

  constructor(props: PropsT) {
    this.history = props.history;
    this.routes = props.routes;
    this.routeUfns = props.routeUfns;
    makeObservable(this);
  }
}
