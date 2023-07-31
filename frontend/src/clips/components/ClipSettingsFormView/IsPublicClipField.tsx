import { observer } from 'mobx-react-lite';
import { ClipT } from '/src/api/types/ClipT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { FormField, FormFieldL } from '/src/forms/components/FormField';
import { cn } from '/src/utils/classnames';

// Import styles
import './IsPublicClipField.scss';

export type PropsT = {
  clip: ClipT;
  playlist: PlaylistT;
};

export const IsPublicClipField = observer((props: PropsT) => {
  const msg = props.clip.nrOfPublicPlaylists
    ? msgPublicClip()
    : msgPrivateClip(props.playlist.name);

  return (
    <FormField className={cn('IsPublicClipField', FormFieldL.input())}>
      <div className={cn('IsPublicClipField__Message', 'my-2')}>{msg}</div>
    </FormField>
  );
});

const msgPublicClip = () => `Since this clip is in one of your public playlists,
it will be visible to everyone. To make it private you must remove
it from all your public playlists.`;

const msgPrivateClip = (
  playlistName: string
) => `Since this clip exists only in your private playlists,
it is private. To make it public you must add it to one of your public
playlists, or make this playlist ("${playlistName}") public.`;
