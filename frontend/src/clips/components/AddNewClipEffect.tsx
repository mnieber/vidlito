import { observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router-dom';
import { createClip } from '/src/api/types/ClipT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ObjT } from '/src/utils/types';

type PropsT = {};

const DefaultProps = {
  ...dps.clipsHighlight,
  ...dps.clipsAddition,
  ...dps.playlist,
  ...dps.userProfile,
};

export const AddNewClipEffect = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { userProfile, clipsAddition, playlist, clipsHighlight } = props;

    const params = useParams() as ObjT;
    const { clipSlug, playlistSlug } = params;

    React.useEffect(() => {
      const mustAddNewClip =
        clipSlug === 'new-clip' &&
        userProfile &&
        !clipsAddition.item &&
        !clipsHighlight.itemId;

      // If the playlist for the current slug has been loaded
      if (mustAddNewClip && playlist?.slug === playlistSlug) {
        clipsAddition.add({
          values: createClip(userProfile, {}),
        });
      }
    }, [clipSlug, playlist]);

    return null;
  }, DefaultProps)
);
