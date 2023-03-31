import React from 'react';
import { Icon } from 'src/frames/components/Icon';
import { lvi } from 'src/frames/components/Lvi';
import { cn } from 'src/utils/classnames';

export type PropsT = {
  tabIndex?: number;
};

export const usePreviewButton = (props: PropsT) => {
  const [descriptionPreview, setDescriptionPreview] = React.useState(false);
  const showPreviewButton = (
    <button
      tabIndex={props.tabIndex ?? 0}
      key="descriptionPreview"
      onClick={() => setDescriptionPreview(!descriptionPreview)}
    >
      {descriptionPreview && (
        <Icon className={cn(lvi.leadingIcon)} name="check" />
      )}
      Preview
    </button>
  );

  return {
    descriptionPreview,
    setDescriptionPreview,
    showPreviewButton,
  };
};
