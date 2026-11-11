import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { withContextProps } from 'react-props-from-context';
import { Edit } from 'skandha-facets';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import {
  DefaultToolButtonTrim,
  ToolButton,
  ToolButtonS,
} from '/src/frames/components/ToolButton';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';
import { createTrim } from '/src/utils/trim';

// Import styles
import './EditButton.scss';

export type PropsT = {
  disabled: boolean;
  edit: Edit;
  className?: any;
};

const ContextProps = {
  clip: clipsCtx.clip,
  playlist: playlistsCtx.playlist,
  username: dashboardCtx.username,
  isOwner: dashboardCtx.isOwner,
};

export const EditButton = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      //
      // 🔳 EditButton 🔳
      //
      <ToolButton
        className={cn(
          [
            'EditButton',
            {
              'EditButton--invisible': R.isNil(props.username),
            },
          ],
          [props.className]
        )}
        trim={ToolButtonTrim}
        disabled={props.disabled}
        iconName="pencil"
        label="Edit"
        onClick={() => props.edit.enable()}
      />
    );
  }, ContextProps)
);

export const ToolButtonTrim = createTrim(DefaultToolButtonTrim, {
  base: {
    Icon: {
      size: ToolButtonS.Icon.size.small(),
      color: ToolButtonS.Icon.color.grayFill(),
    },
  },
});
