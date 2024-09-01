import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { Route } from 'wouter';
import { AddNewClipEffect, SelectClipEffect } from '/src/clips/components';
import { VideoAndCopView } from '/src/clips/components/VideoAndCopView';
import { dashboardNav, dashboardRoutes } from '/src/dashboard/routes';
import { CardS } from '/src/frames/components/Card';
import {
  AddNewPlaylistEffect,
  ForwardToClipEffect,
  PlaylistFormView,
  SelectPlaylistEffect,
} from '/src/playlists/components';
import { PlaylistNotFound } from '/src/playlists/components/PlaylistNotFound';
import { ext } from '/src/routes/navHandler';
import { cn } from '/src/utils/classnames';

export type PropsT = {};

export const PlaylistSwitch = observer(
  R.identity((props: PropsT) => {
    return (
      <>
        <Route path={ext(dashboardRoutes.playlist)}>
          <SelectPlaylistEffect />
          <AddNewPlaylistEffect />
          <Route path={dashboardRoutes.playlist}>
            <PlaylistNotFound />
          </Route>
          <Route path={dashboardRoutes.playlist}>
            <ForwardToClipEffect />
          </Route>
          <Route
            path={
              dashboardNav.playlist({
                ownerUsername: ':ownerUsername',
                playlistSlug: 'new-playlist',
              }).url
            }
          >
            {
              // 🔳 PlaylistFormView 🔳
            }
            <PlaylistFormView
              className={cn(CardS.size.medium(), 'mx-4 mt-4')}
            />
          </Route>
          <Route path={dashboardRoutes.clip}>
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
