import { useEffect, useRef, useState } from 'react';

export const useDelayedFlag = (
  flag: boolean,
  delay: number,
  dependencies: any[]
) => {
  const [state, setState] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If the new state is false, then set the state immediately
    // and clear the timer.
    if (!flag) {
      setState(false);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    } else {
      // If the new state is true and the old state is false,
      // then set a timer for updating the state to true.
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

  // Reset timer if the dependencies change
  useEffect(() => {
    setState(false);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, dependencies); // re-run effect if flag, delay, or state changes

  return state;
};
