import {useEffect, useRef, useState} from "react";

export function useFlashHighlight<T>(
  initial: T,
  ms = 800,
): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(initial);
  const timerRef = useRef<number | undefined>(undefined);

  const flash = (next: T) => {
    if (timerRef.current !== undefined) {
      window.clearTimeout(timerRef.current);
    }
    setValue(next);
    timerRef.current = window.setTimeout(() => {
      setValue(initial);
      timerRef.current = undefined;
    }, ms);
  };

  useEffect(
    () => () => {
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current);
      }
    },
    [],
  );

  return [value, flash];
}
