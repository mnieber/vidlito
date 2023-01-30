import { cleanUpCtr } from 'react-default-props-context';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
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

  goToPlaylist(playlist: PlaylistT) {
    this.playlist = playlist;
    const replaceFn = this.routeUfns.playlist(this.history.push);
    replaceFn(playlist);
  }

  goToClip(clip: ClipT) {
    if (!this.playlist) throw new Error('No playlist set');
    const replaceFn = this.routeUfns.clip(this.history.push);
    replaceFn(this.playlist, clip);
  }

  constructor(props: PropsT) {
    this.history = props.history;
    this.routeUfns = props.routeUfns;
  }
}
