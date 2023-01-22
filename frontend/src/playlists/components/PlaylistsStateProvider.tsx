import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useDeletePlaylist, useSavePlaylist } from 'src/api/mutations';
import { useGetPlaylists } from 'src/api/queries';
import { initRS, maybe, setToUpdating } from 'src/api/ResourceState';
import { withDefaultProps } from 'src/app/defaultProps';
import { flags } from 'src/app/flags';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { PlaylistsState } from 'src/playlists/PlaylistsState';
import { lookUp } from 'src/utils/ids';
import { log } from 'src/utils/logging';
import { ObjT } from 'src/utils/types';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const PlaylistsStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const getPlaylists = useGetPlaylists();
    const deletePlaylist = useDeletePlaylist();
    const savePlaylist = useSavePlaylist();

    const [state] = React.useState(
      () =>
        new PlaylistsState({
          deletePlaylists: (ids: string[]) => {
            R.map(
              setToUpdating,
              lookUp(ids, state.playlists.data.playlistById)
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
        state.playlists.data.playlists = inputs.playlists ?? [];

        if (flags.logStateProviders) {
          log('PlaylistsState updated', state.getSummary());
        }
      },
      destroyState: () => state.destroy(),
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          playlistsState: () => state,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        playlists: () =>
          maybe(getPlaylists, [])(state.playlists.data.playlists),
        playlist: () => maybe(getPlaylists)(state.playlists.highlight.item),
        playlistsDeletion: () => state.playlists.deletion,
        playlistsEditing: () => state.playlists.editing,
        playlistsHighlight: () => state.playlists.highlight,
        playlistsSelection: () => state.playlists.selection,
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
