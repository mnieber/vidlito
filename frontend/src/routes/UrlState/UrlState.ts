import { action, makeObservable, observable } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import { ClipT } from 'src/api/types/ClipT';
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

  getSummary() {
    return {};
  }

  destroy() {
    cleanUpCtr(this);
  }

  goBack() {
    this.history.goBack();
  }

  @action goToPlaylist(playlistSlug: string, updateUrl: boolean = true) {
    this.playlistSlug = playlistSlug;
    if (updateUrl) {
      const ufn = this.routeUfns.playlist(this.history.push);
      ufn(playlistSlug);
    }
  }

  goToClip(clip: ClipT, playlistSlug?: string) {
    if (playlistSlug) this.goToPlaylist(playlistSlug, false);
    if (!this.playlistSlug) throw new Error('No playlist set');
    const ufn = this.routeUfns.clip(this.history.push);
    ufn(this.playlistSlug, clip);
  }

  goHome() {
    this.playlistSlug = undefined;
    this.history.push(getHomeRoute());
  }

  goToActions() {
    const ufn = this.routeUfns.actions(this.history.push);
    ufn(this.playlistSlug);
  }

  constructor(props: PropsT) {
    this.history = props.history;
    this.routeUfns = props.routeUfns;
    makeObservable(this);
  }
}
