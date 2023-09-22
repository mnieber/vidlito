import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Route } from 'react-router-dom';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import { AddNewClipEffect, SelectClipEffect } from '/src/clips/components';
import { VideoAndCopView } from '/src/clips/components/VideoAndCopView';
import type { RoutesT as DashboardRoutesT } from '/src/dashboard/routeTable';
import { CardS } from '/src/frames/components/Card';
import {
  AddNewPlaylistEffect,
  ForwardToClipEffect,
  PlaylistFormView,
  SelectPlaylistEffect,
} from '/src/playlists/components';
import { PlaylistNotFound } from '/src/playlists/components/PlaylistNotFound';
import { getRouteFns } from '/src/routes/routeTable';
import { cn } from '/src/utils/classnames';

export type PropsT = {};

export const PlaylistSwitch = observer(
  R.identity((props: PropsT) => {
    const routeFns = getRouteFns<AuthRoutesT & DashboardRoutesT>();
    return (
      <>
        <Route exact={false} path={routeFns.playlist()}>
          <SelectPlaylistEffect />
          <AddNewPlaylistEffect />
          <Route path={routeFns.playlist()}>
            <PlaylistNotFound />
          </Route>
          <Route exact={true} path={routeFns.playlist()}>
            <ForwardToClipEffect />
          </Route>
          <Route
            exact={true}
            path={routeFns.playlist({
              ownerUsername: ':ownerUsername',
              playlistSlug: 'new-playlist',
            })}
          >
            {
              // 🔳 PlaylistFormView 🔳
            }
            <PlaylistFormView
              className={cn(CardS.size.medium(), 'mx-4 mt-4')}
            />
          </Route>
          <Route exact={true} path={routeFns.clip()}>
            <SelectClipEffect />
            <AddNewClipEffect />
            {
              // 🔳 VideoAndCopView 🔳
            }
            <VideoAndCopView />
          </Route>
        </Route>
      </>
    );
  })
);
