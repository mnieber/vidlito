import React from 'react';
import { ToolButton } from '/src/frames/components/ToolButton';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  tabIndex?: number;
  className?: any;
};

export const usePreviewButton = (props: PropsT) => {
  const [descriptionPreview, setDescriptionPreview] = React.useState(false);
  const showPreviewButton = (
    <ToolButton
      label="Preview"
      themeClassName="Modest"
      className={cn('PreviewButton', props.className)}
      tabIndex={props.tabIndex ?? 0}
      key="descriptionPreview"
      iconName={descriptionPreview ? 'checkFilled' : 'checkEmpty'}
      iconMargin="none"
      onClick={() => setDescriptionPreview(!descriptionPreview)}
    />
  );

  return {
    descriptionPreview,
    setDescriptionPreview,
    showPreviewButton,
  };
};
