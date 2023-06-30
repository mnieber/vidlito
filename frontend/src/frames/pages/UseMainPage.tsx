import { useRouteMatch } from 'react-router-dom';
import { navToActions } from '/src/actions/ActionsNavEvents';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { navToClip } from '/src/clips/ClipsNavEvents';
import { useInstallNavLayer } from '/src/navHandler';
import { navHandler } from '/src/navHandler/NavHandler';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { navToSearch } from '/src/search/SearchNavEvents';

export const createMainNavEventLayer = () => {
  return {
    navToActions: ((username: string) => {
      const ufn = navHandler.routeUfns.actions(navHandler.history.push);
      ufn({
        ...navHandler.getParams(true),
        ownerUsername: username,
      });
    }) as typeof navToActions,
    navToSearch: (() => {
      const ufn = navHandler.routeUfns.search(navHandler.history.push);
      ufn({
        ...navHandler.getParams(true),
      });
    }) as typeof navToSearch,
    navToClip: ((playlist: PlaylistT, clipSlug: string) => {
      navHandler.hiddenParams.clipSlug = clipSlug;
      const ufn = navHandler.routeUfns.clip(navHandler.history.push);
      ufn({
        ...navHandler.getParams(),
        ownerUsername: playlist.owner.username,
        playlistSlug: playlist.slug,
        clipSlug,
      });
    }) as typeof navToClip,
    navToPlaylist: ((ownerUsername: string, playlistSlug: string) => {
      navHandler.hiddenParams.playlistSlug = playlistSlug;
      const ufn = navHandler.routeUfns.playlist(navHandler.history.push);
      ufn({ ...navHandler.getParams(true), ownerUsername, playlistSlug });
    }) as typeof navToPlaylist,
  };
};

export type PropsT = React.PropsWithChildren<{}>;

export const DefaultProps = {
  ...dps.videoController,
  ...dps.clips,
  ...dps.clipsHighlight,
};

export const UseMainPage = withDefaultProps(
  (props: PropsT & typeof DefaultProps) => {
    const routeMatch = useRouteMatch();
    useInstallNavLayer(
      'MainNavEventLayer',
      routeMatch.path,
      createMainNavEventLayer()
    );
    return <>{props.children}</>;
  },
  DefaultProps
);
