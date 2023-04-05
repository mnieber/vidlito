import { action, makeObservable } from 'mobx';
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

  getSummary() {
    return {};
  }

  destroy() {
    cleanUpCtr(this);
  }

  goBack() {
    this.history.goBack();
  }

  @action userHighlightsPlaylist(playlistSlug: string) {
    for (const match of getMatchingRoutes(this.routes, pathname())) {
      if (match.params.playlistOwnerUsername) {
        const ufn = this.routeUfns.playlist(this.history.push);
        ufn(match.params.playlistOwnerUsername, playlistSlug);
        return;
      }
    }
  }

  @action userHighlightsClip(clipSlug: string) {
    for (const match of getMatchingRoutes(this.routes, pathname())) {
      if (match.params.playlistOwnerUsername && match.params.playlistSlug) {
        const ufn = this.routeUfns.clip(this.history.push);
        ufn(
          match.params.playlistOwnerUsername,
          match.params.playlistSlug,
          clipSlug
        );
        return;
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

  clipHighlightIsCorrectedTo(clipSlug: string) {
    if (this.isOnMainPage()) {
      for (const match of getMatchingRoutes(this.routes, pathname())) {
        if (match.params.playlistOwnerUsername && match.params.playlistSlug) {
          const ufn = this.routeUfns.clip(this.history.push);
          ufn(
            match.params.playlistOwnerUsername,
            match.params.playlistSlug,
            clipSlug
          );
          return;
        }
      }
    }
  }

  goHome() {
    this.history.push(getHomeRoute());
  }

  @action goToActions() {
    const ufn = this.routeUfns.actions(this.history.push);
    ufn();
  }

  @action closeActions() {}

  userCreatesNewPlaylist() {}

  constructor(props: PropsT) {
    this.history = props.history;
    this.routes = props.routes;
    this.routeUfns = props.routeUfns;
    makeObservable(this);
  }
}
