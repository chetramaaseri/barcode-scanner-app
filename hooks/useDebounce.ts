import { useCallback, useRef } from 'react';

export function useDebounce(callback: (text: string) => void, delay: number){
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (text: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear the previous timeout
      }
      timeoutRef.current = setTimeout(() => {
        callback(text); // Execute the callback after the delay
      }, delay);
    },
    [callback, delay] // Dependencies for useCallback
  );
};