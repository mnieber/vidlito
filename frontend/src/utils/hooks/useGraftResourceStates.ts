import React from 'react';
import { graftResourceStates } from '/src/resourceStates/graftResourceStates';

export type PropsT = {
  resources: any[];
};

export const useGraftResourceStates = (props: PropsT) => {
  const prevResourcesRef = React.useRef<any[]>();

  graftResourceStates({
    resources: props.resources ?? [],
    prevResources: prevResourcesRef.current ?? [],
  });

  prevResourcesRef.current = props.resources;
};
