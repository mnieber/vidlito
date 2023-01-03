import { observer } from 'mobx-react-lite';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { defaultProps as dps, withDefaultProps } from 'src/app/defaultProps';
import { error } from 'src/frames/components/Error';
import { slugify } from 'src/utils';
import { cn } from 'src/utils/classnames';
import { PickerValueT, ValuePicker } from 'src/utils/components/ValuePicker';
import { useValuePickerState } from 'src/utils/hooks/useValuePickerState';
import { createUUID } from 'src/utils/ids';
import UIkit from 'uikit';
import './PlaylistPicker.scss';

export type PropsT = {
  updateUrl?: (playlist: PlaylistT) => void;
  className?: any;
};

const DefaultProps = {
  ...dps.playlists,
  ...dps.playlistsHighlight,
  ...dps.savePlaylist,
};

export const PlaylistPicker = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const state = useValuePickerState<PlaylistT>({
      highlight: props.playlistsHighlight,
      updateUrl: props.updateUrl,
    });

    const onChange = (value: PickerValueT) => {
      if (value.__isNew__) {
        const playlistName = value.label;
        const id = createUUID();
        state.setIsUpdating(true);
        props
          .savePlaylist({
            playlistForm: {
              name: playlistName,
              slug: slugify(playlistName),
              id: id,
            },
          })
          .then(() => state.setItemWhenReady(props.playlists, id));
      } else if (value.value) {
        state.setItem(value.value);
      }
    };

    return (
      <div className={cn('PlaylistPicker', props.className)}>
        {UIkit && state.isUpdating && (
          <div
            data-uk-spinner
            className="absolute"
            style={{ zIndex: 100 }}
          ></div>
        )}
        <ValuePicker
          isMulti={false}
          isCreatable={true}
          pickableValues={props.playlists}
          labelFromValue={(x: any) => x.name}
          pickableValue={props.playlistsHighlight.item}
          placeholder="Select playlist"
          onChange={onChange}
        />
        {state.isError && (
          <div className={cn(error)}>
            Oops, the playlist could not be created
          </div>
        )}
      </div>
    );
  }, DefaultProps)
);
