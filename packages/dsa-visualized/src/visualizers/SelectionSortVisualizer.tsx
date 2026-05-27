import {useCallback, useState} from "react";
import {Box} from "@mui/material";
import {useStepRunner} from "../hooks/useStepRunner";
import {HIGHLIGHT_COLORS, SortBars, StepControls, randomArray} from "./shared";

interface Frame {
  values: number[];
  i: number;
  j: number;
  minIndex: number;
  done: boolean;
}

const buildFrames = (input: number[]): Frame[] => {
  const arr = [...input];
  const frames: Frame[] = [
    {values: [...arr], i: -1, j: -1, minIndex: -1, done: false},
  ];
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    frames.push({values: [...arr], i, j: i, minIndex, done: false});
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      frames.push({values: [...arr], i, j, minIndex, done: false});
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      frames.push({
        values: [...arr],
        i,
        j: arr.length,
        minIndex: i,
        done: false,
      });
    }
  }
  frames.push({
    values: [...arr],
    i: arr.length,
    j: -1,
    minIndex: -1,
    done: true,
  });
  return frames;
};

export const SelectionSortVisualizer = () => {
  const [input, setInput] = useState<number[]>(() => randomArray());
  const build = useCallback(() => buildFrames(input), [input]);
  const runner = useStepRunner<Frame>({
    buildFrames: build,
    initialSpeedMs: 220,
  });
  const f = runner.frame;

  const colorFor = (idx: number) => {
    if (f.done) return HIGHLIGHT_COLORS.settled;
    if (idx < f.i) return HIGHLIGHT_COLORS.settled;
    if (idx === f.minIndex) return HIGHLIGHT_COLORS.compare;
    if (idx === f.j) return HIGHLIGHT_COLORS.active;
    if (idx === f.i) return HIGHLIGHT_COLORS.pivot;
    return HIGHLIGHT_COLORS.default;
  };

  return (
    <Box>
      <SortBars values={f.values} colorFor={colorFor} />
      <StepControls
        runner={runner}
        onShuffle={() => setInput(randomArray())}
        caption={
          f.done
            ? "sorted"
            : f.i >= 0
              ? `pass i=${f.i}, current min idx=${f.minIndex}`
              : "start"
        }
      />
    </Box>
  );
};
