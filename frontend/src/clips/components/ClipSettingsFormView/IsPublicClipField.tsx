import { observer } from 'mobx-react-lite';
import { ClipT } from '/src/api/types/ClipT';
import { FormFieldL } from '/src/forms/components/FormField';
import { cn } from '/src/utils/classnames';

// Import styles
import './IsPublicClipField.scss';

export type PropsT = {
  clip: ClipT;
};

export const IsPublicClipField = observer((props: PropsT) => {
  const msg = props.clip.nrOfPublicPlaylists ? msgPublicClip : msgPrivateClip;

  return (
    <div
      className={cn('IsPublicClipField', FormFieldL.root(), FormFieldL.input())}
    >
      <div className={cn('IsPublicClipField__Message', 'my-2')}>{msg}</div>
    </div>
  );
});

const msgPublicClip = `Since this clip is in one of your public playlists,
it will be visible to everyone. To make the clip private, you must remove
it from all your public playlists, or make these playlists private.`;

const msgPrivateClip = `Since this clip exists only in your private playlist(s),
it is private. To make the clip public, you must add it to one of your public
playlists, or make this playlist public.`;
