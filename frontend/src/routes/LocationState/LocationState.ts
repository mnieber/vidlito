import { cleanUpCtr } from 'react-default-props-context';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { getHomeRoute } from 'src/routes/getHomeRoute';
import { ObjT } from 'src/utils/types';

export type PropsT = {
  history: any;
  routeUfns: ObjT;
};

export class LocationState {
  history: any;
  routeUfns: ObjT;
  playlist?: PlaylistT;

  getSummary() {
    return {};
  }

  destroy() {
    cleanUpCtr(this);
  }

  goBack() {
    this.history.goBack();
  }

  goToPlaylist(playlist: PlaylistT, updateUrl: boolean = true) {
    this.playlist = playlist;
    if (updateUrl) {
      const ufn = this.routeUfns.playlist(this.history.push);
      ufn(playlist);
    }
  }

  goToClip(clip: ClipT, playlist?: PlaylistT) {
    if (playlist) this.playlist = playlist;
    if (!this.playlist) throw new Error('No playlist set');
    const ufn = this.routeUfns.clip(this.history.push);
    ufn(this.playlist, clip);
  }

  goHome() {
    this.playlist = undefined;
    this.history.push(getHomeRoute());
  }

  constructor(props: PropsT) {
    this.history = props.history;
    this.routeUfns = props.routeUfns;
  }
}
