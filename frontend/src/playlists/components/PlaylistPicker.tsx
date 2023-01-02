import { when } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { defaultProps as dps, withDefaultProps } from 'src/app/defaultProps';
import { slugify } from 'src/utils';
import { cn } from 'src/utils/classnames';
import { PickerValueT, ValuePicker } from 'src/utils/components/ValuePicker';
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
    const [isUpdating, setIsUpdating] = React.useState(false);

    const setItem = React.useMemo(
      () => (itemId: string, value: PlaylistT) => {
        props.playlistsHighlight.highlightItem(itemId);
        props.updateUrl && props.updateUrl(value);
      },
      [props]
    );

    const onChange = (value: PickerValueT) => {
      if (value.__isNew__) {
        const playlistName = value.label;
        const id = createUUID();
        setIsUpdating(true);
        props
          .savePlaylist({
            playlistForm: {
              name: playlistName,
              slug: slugify(playlistName),
              id: id,
            },
          })
          .then(() => {
            let playlist: PlaylistT | undefined = undefined;
            when(
              () => !!(playlist = props.playlists.find((x) => x.id === id)),
              () => {
                playlist && setItem(id, playlist);
                setIsUpdating(false);
              },
              {
                timeout: 5000,
                onError: () => setIsUpdating(false),
              }
            );
          });
      } else if (value.value) {
        setItem(value.value.id, value.value);
      }
    };

    return (
      <div className={cn('PlaylistPicker', props.className)}>
        {UIkit && isUpdating && (
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
      </div>
    );
  }, DefaultProps)
);
