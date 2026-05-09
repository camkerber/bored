import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";

interface Options<F> {
  buildFrames: () => F[];
  initialSpeedMs?: number;
}

interface Runner<F> {
  frame: F;
  index: number;
  total: number;
  isPlaying: boolean;
  isFinished: boolean;
  speedMs: number;
  step: () => void;
  back: () => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  rebuild: () => void;
  setSpeedMs: (ms: number) => void;
}

export function useStepRunner<F>({
  buildFrames,
  initialSpeedMs = 250,
}: Options<F>): Runner<F> {
  const [frames, setFrames] = useState<F[]>(() => buildFrames());
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(initialSpeedMs);
  const buildRef = useRef(buildFrames);
  useLayoutEffect(() => {
    buildRef.current = buildFrames;
  });

  const isFinished = index >= frames.length - 1;
  const isActuallyPlaying = isPlaying && !isFinished;

  const step = useCallback(() => {
    setIndex((i) => Math.min(i + 1, frames.length - 1));
  }, [frames.length]);

  const back = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const play = useCallback(() => {
    if (isFinished) {
      setIndex(0);
    }
    setIsPlaying(true);
  }, [isFinished]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setIndex(0);
  }, []);

  const rebuild = useCallback(() => {
    setIsPlaying(false);
    setIndex(0);
    setFrames(buildRef.current());
  }, []);

  useEffect(() => {
    if (!isActuallyPlaying) return;
    const id = window.setTimeout(() => {
      setIndex((i) => Math.min(i + 1, frames.length - 1));
    }, speedMs);
    return () => window.clearTimeout(id);
  }, [isActuallyPlaying, index, speedMs, frames.length]);

  return useMemo(
    () => ({
      frame: frames[index],
      index,
      total: frames.length,
      isPlaying: isActuallyPlaying,
      isFinished,
      speedMs,
      step,
      back,
      play,
      pause,
      reset,
      rebuild,
      setSpeedMs,
    }),
    [
      frames,
      index,
      isActuallyPlaying,
      isFinished,
      speedMs,
      step,
      back,
      play,
      pause,
      reset,
      rebuild,
    ],
  );
}
