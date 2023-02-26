import { action, makeObservable, observable } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import { getHomeRoute } from 'src/routes/getHomeRoute';
import { ObjT } from 'src/utils/types';

export type PropsT = {
  history: any;
  routeUfns: ObjT;
};

export class UrlState {
  history: any;
  routeUfns: ObjT;
  @observable playlistSlug?: string;
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

  @action setPlaylistSlug(playlistSlug: string, updateUrl: boolean) {
    this.playlistSlug = playlistSlug;
    if (updateUrl) {
      const ufn = this.routeUfns.playlist(this.history.push);
      ufn(playlistSlug);
    }
  }

  setClipSlug(clipSlug: string, updateUrl: boolean) {
    this.clipSlug = clipSlug;
    if (updateUrl) {
      if (!this.playlistSlug) throw new Error('No playlist set');
      const ufn = this.routeUfns.clip(this.history.push);
      ufn(this.playlistSlug, this.clipSlug);
    }
  }

  goHome() {
    this.playlistSlug = undefined;
    this.history.push(getHomeRoute());
  }

  @action goToActions() {
    this.urlBeforeGoToActions = this.history.location.pathname;
    const ufn = this.routeUfns.actions(this.history.push);
    ufn(this.playlistSlug);
  }

  @action closeActions() {
    this.history.push(this.urlBeforeGoToActions);
    this.urlBeforeGoToActions = undefined;
  }

  constructor(props: PropsT) {
    this.history = props.history;
    this.routeUfns = props.routeUfns;
    makeObservable(this);
  }
}
