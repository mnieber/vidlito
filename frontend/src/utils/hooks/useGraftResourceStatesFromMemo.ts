import React from 'react';
import { graftResourceStates } from '/src/resourceStates/graftResourceStates';

export const useGraftResourceStatesFromMemo = () => {
  const prevResourcesRef = React.useRef<any[]>();

  return (args: { resources: any[] }): any[] => {
    graftResourceStates({
      resources: args.resources ?? [],
      prevResources: prevResourcesRef.current ?? [],
    });
    prevResourcesRef.current = args.resources;
    return args.resources;
  };
};
