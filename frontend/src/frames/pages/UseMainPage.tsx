import { useRouteMatch } from 'react-router-dom';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import {
  ActionsNavEvents,
  ClipsNavEvents,
  PlaylistsNavEvents,
} from '/src/frames/pages';
import { NavHandler, useInstallNavLayer } from '/src/navHandler';
import { NavLayer } from '/src/navHandler/NavHandler';

export type MainNavEventLayerT = typeof ActionsNavEvents &
  typeof ClipsNavEvents &
  typeof PlaylistsNavEvents & {};

export class MainNavEventLayer extends NavLayer implements MainNavEventLayerT {
  maybePausePlayer: (clipSlug: string) => void;

  goToActions(this: NavHandler) {
    this.updateHiddenParams();
    const ufn = this.routeUfns.actions(this.history.push);
    ufn({
      ...this.getParams(true),
      ownerUsername: this.hiddenParams.username,
    });
  }

  clipHighlightIsCorrectedTo(this: NavHandler, clipSlug: string) {
    this.hiddenParams.clipSlug = clipSlug;
    const ufn = this.routeUfns.clip(this.history.push);
    ufn({ ...this.getParams(), clipSlug });
  }

  userHighlightsClip(this: NavHandler, clipSlug: string) {
    (this._currentNavLayer as MainNavEventLayer).maybePausePlayer(clipSlug);
    this.hiddenParams.clipSlug = clipSlug;
    const ufn = this.routeUfns.clip(this.history.push);
    ufn({ ...this.getParams(), clipSlug });
  }

  userCancelledClipForm(this: NavHandler) {}

  userSubmittedClipForm(this: NavHandler, clipSlug: string) {}

  playlistHighlightIsCorrectedTo(this: NavHandler, playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const ufn = this.routeUfns.playlist(this.history.push);
    ufn({ ...this.getParams(), playlistSlug });
  }

  userCancelledPlaylistForm(this: NavHandler) {}

  userHighlightsPlaylist(this: NavHandler, playlistSlug: string) {
    this.hiddenParams.playlistSlug = playlistSlug;
    const ufn = this.routeUfns.playlist(this.history.push);
    ufn({ ...this.getParams(true), playlistSlug });
  }

  userSubmittedPlaylistForm(this: NavHandler, playlistSlug: string) {}

  constructor(
    name: string,
    route: string,
    maybePausePlayer: (clipSlug: string) => void
  ) {
    super(name, route);
    this.maybePausePlayer = maybePausePlayer;
  }
}

export type PropsT = React.PropsWithChildren<{}>;

export const DefaultProps = {
  ...dps.videoController,
  ...dps.clips,
  ...dps.clipsHighlight,
};

export const UseMainPage = withDefaultProps(
  (props: PropsT & typeof DefaultProps) => {
    const routeMatch = useRouteMatch();
    const maybePausePlayer = (name: string, route: string) =>
      new MainNavEventLayer(name, route, (clipSlug: string) => {
        const clip = props.clips.find((c) => c.slug === clipSlug);
        if (clip) {
          if (props.clipsHighlight.id !== clip.id) {
            props.videoController.togglePlay(false);
          }
        }
      });
    useInstallNavLayer('MainNavEventLayer', routeMatch.path, maybePausePlayer);
    return <>{props.children}</>;
  },
  DefaultProps
);
