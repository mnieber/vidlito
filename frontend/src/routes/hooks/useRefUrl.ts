import React from 'react';
import { useLocation } from 'react-router-dom';

export const useRefUrl = () => {
  const location = useLocation();
  const refUrl = React.useRef<string>('');
  const updateRefUrl = () => (refUrl.current = location.pathname);
  return {
    hasUrlChanged: refUrl.current !== location.pathname,
    updateRefUrl,
  };
};
