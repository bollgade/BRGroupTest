import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, delay: number) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const activateTimer = useCallback(() => {
    timerRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);

  const deleteTimer = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    activateTimer();
    return deleteTimer;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [activateTimer, deleteTimer];
};
