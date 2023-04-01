import React from 'react';

export const usePropsRef = <PropsT>(props: PropsT) => {
  const propsRef = React.useRef<PropsT>();
  propsRef.current = { ...props };
  return propsRef;
};
