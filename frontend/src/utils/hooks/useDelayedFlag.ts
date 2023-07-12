import { useEffect, useRef, useState } from 'react';

export const useDelayedFlag = (flag: boolean, delay: number) => {
  const [state, setState] = useState(flag);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!flag) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      setState(false);
    } else {
      // Only set the state to true if it isn't already
      if (!state && timeoutIdRef.current === null) {
        timeoutIdRef.current = setTimeout(() => {
          setState(true);
          timeoutIdRef.current = null;
        }, delay);
      }
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [flag, delay, state]); // re-run effect if flag, delay, or state changes

  return state;
};
