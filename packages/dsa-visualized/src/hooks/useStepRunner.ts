import {useEffect, useState} from "react";

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

  const isFinished = index >= frames.length - 1;
  const isActuallyPlaying = isPlaying && !isFinished;

  const step = () => setIndex((i) => Math.min(i + 1, frames.length - 1));
  const back = () => setIndex((i) => Math.max(i - 1, 0));
  const play = () => {
    if (isFinished) setIndex(0);
    setIsPlaying(true);
  };
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setIsPlaying(false);
    setIndex(0);
  };
  const rebuild = () => {
    setIsPlaying(false);
    setIndex(0);
    setFrames(buildFrames());
  };

  useEffect(() => {
    if (!isActuallyPlaying) return;
    const id = window.setTimeout(() => {
      setIndex((i) => Math.min(i + 1, frames.length - 1));
    }, speedMs);
    return () => window.clearTimeout(id);
  }, [isActuallyPlaying, index, speedMs, frames.length]);

  return {
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
  };
}
