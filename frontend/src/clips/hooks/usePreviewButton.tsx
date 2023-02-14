import React from 'react';
import { Icon } from 'src/frames/components/Icon';

export type PropsT = {};

export const usePreviewButton = (props: PropsT) => {
  const [descriptionPreview, setDescriptionPreview] = React.useState(false);
  const showPreviewButton = (
    <button
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
