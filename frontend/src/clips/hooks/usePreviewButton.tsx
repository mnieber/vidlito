import React from 'react';
import { ToolButton, ToolButtonS } from '/src/frames/components/ToolButton';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  tabIndex?: number;
  className?: any;
};

export const usePreviewButton = (props: PropsT) => {
  const [descriptionPreview, setDescriptionPreview] = React.useState(false);
  const showPreviewButton = (
    <ToolButton
      className={cn('PreviewButton', props.className)}
      componentClassName="Modest-ToolButton"
      iconClassName={cn(
        ToolButtonS.Icon.size.medium(),
        ToolButtonS.Icon.margin.none()
      )}
      iconName={descriptionPreview ? 'checkFilled' : 'checkEmpty'}
      key="descriptionPreview"
      label="Preview"
      onClick={() => setDescriptionPreview(!descriptionPreview)}
      tabIndex={props.tabIndex ?? 0}
    />
  );

  return {
    descriptionPreview,
    setDescriptionPreview,
    showPreviewButton,
  };
};
