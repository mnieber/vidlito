import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useDeletePlaylist, useSavePlaylist } from 'src/api/mutations';
import { useGetPlaylists } from 'src/api/queries';
import { initRS, maybe, setToUpdating } from 'src/api/ResourceState';
import { createPlaylist } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { flags } from 'src/app/flags';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { PlaylistsState } from 'src/playlists/PlaylistsState';
import { lookUp } from 'src/utils/ids';
import { log } from 'src/utils/logging';
import { ObjT } from 'src/utils/types';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.locationState,
};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const getPlaylists = useGetPlaylists();
    const deletePlaylist = useDeletePlaylist();
    const savePlaylist = useSavePlaylist();

    const [playlistsState] = React.useState(
      () =>
        new PlaylistsState({
          deletePlaylists: (ids: string[]) => {
            R.map(
              setToUpdating,
              lookUp(ids, playlistsState.playlists.data.playlistById)
            );
            return Promise.all(
              R.map(
                (x: string) => deletePlaylist.mutateAsync({ playlistId: x }),
                ids
              )
            );
          },
          savePlaylist: (values: ObjT) => {
            // Moonleap Todo: convert from values to playlist form
            return savePlaylist.mutateAsync(values);
          },
          createPlaylist: (values: ObjT) => {
            return initRS(createPlaylist(values));
          },
          locationState: props.locationState,
        })
    );

    useUpdateStateReaction({
      getInputs: () => {
        return {
          playlists: getPlaylists.data?.playlists,
        };
      },
      updateState: (inputs) => {
        R.forEach(initRS, inputs.playlists ?? []);
        playlistsState.playlists.data.playlists = inputs.playlists ?? [];

        if (flags.logStateProviders) {
          log('PlaylistsState updated', playlistsState.getSummary());
        }
      },
      destroyState: () => playlistsState.destroy(),
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          playlistsState: () => playlistsState,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        playlists: () =>
          maybe(
            getPlaylists,
            []
          )(playlistsState.playlists.data.playlistsDisplay),
        playlist: () =>
          maybe(getPlaylists)(playlistsState.playlists.highlight.item),
        playlistsAddition: () => playlistsState.playlists.addition,
        playlistsDeletion: () => playlistsState.playlists.deletion,
        playlistsEditing: () => playlistsState.playlists.editing,
        playlistsHighlight: () => playlistsState.playlists.highlight,
        playlistsSelection: () => playlistsState.playlists.selection,
      };

      return result;
    };

    return (
      <NestedDefaultPropsContext value={getDefaultPropsContext()}>
        {props.children}
      </NestedDefaultPropsContext>
    );
  }, DefaultProps)
);
