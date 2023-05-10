import React from 'react';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  tabIndex?: number;
  className?: any;
};

export const usePreviewButton = (props: PropsT) => {
  const [descriptionPreview, setDescriptionPreview] = React.useState(false);
  const showPreviewButton = (
    <button
      className={props.className}
      tabIndex={props.tabIndex ?? 0}
      key="descriptionPreview"
      onClick={() => setDescriptionPreview(!descriptionPreview)}
    >
      {descriptionPreview && (
        <Icon className={cn(L.DialogButton.icon())} name="check" />
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
