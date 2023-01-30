import React from 'react';

export const usePlaylistDescriptionState = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const toggle = React.useMemo(
    () => () => setIsExpanded(!isExpanded),
    [isExpanded, setIsExpanded]
  );
  return {
    isExpanded,
    toggle,
    setIsExpanded,
  };
};
