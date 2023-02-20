import React from 'react';
import { Icon } from 'src/frames/components/Icon';

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
      {descriptionPreview && <Icon name="check" />}
      Preview
    </button>
  );

  return {
    descriptionPreview,
    setDescriptionPreview,
    showPreviewButton,
  };
};
