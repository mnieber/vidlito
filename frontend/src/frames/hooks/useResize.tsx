import _debounce from 'lodash/debounce';
import * as R from 'ramda';
import React from 'react';

export type PropsT = {
  debounceInterval?: number;
};

export const useResize = (props: PropsT) => {
  const [isResizing, setIsResizing] = React.useState(false);
  const [panelWidth, setPanelWidth] = React.useState<number | undefined>(
    undefined
  );

  const handleResize = React.useMemo(
    () =>
      _debounce((width?: number) => {
        if (!R.isNil(width)) {
          setPanelWidth(width);
          setIsResizing(false);
        }
      }, props.debounceInterval ?? 50),
    [setPanelWidth]
  );

  return {
    isResizing,
    panelWidth,
    handleResize,
    onResize: (width: number | undefined) => {
      setIsResizing(true);
      handleResize(width);
    },
  };
};
