import {useCallback, useState} from "react";
import {Box} from "@mui/material";
import {useStepRunner} from "../hooks/useStepRunner";
import {SortBars, StepControls, randomArray} from "./shared";

interface Frame {
  values: number[];
  j: number;
  swapped: boolean;
  settledFromIndex: number;
  done: boolean;
}

const buildFrames = (input: number[]): Frame[] => {
  const arr = [...input];
  const frames: Frame[] = [
    {
      values: [...arr],
      j: -1,
      swapped: false,
      settledFromIndex: arr.length,
      done: false,
    },
  ];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      frames.push({
        values: [...arr],
        j,
        swapped: false,
        settledFromIndex: arr.length - i,
        done: false,
      });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        frames.push({
          values: [...arr],
          j,
          swapped: true,
          settledFromIndex: arr.length - i,
          done: false,
        });
      }
    }
  }
  frames.push({
    values: [...arr],
    j: -1,
    swapped: false,
    settledFromIndex: 0,
    done: true,
  });
  return frames;
};

export const BubbleSortVisualizer = () => {
  const [input, setInput] = useState<number[]>(() => randomArray());
  const build = useCallback(() => buildFrames(input), [input]);
  const runner = useStepRunner<Frame>({
    buildFrames: build,
    initialSpeedMs: 220,
  });
  const f = runner.frame;

  const colorFor = (idx: number) => {
    if (f.done) return "#4caf50";
    if (idx >= f.settledFromIndex) return "#4caf50";
    if (idx === f.j || idx === f.j + 1)
      return f.swapped ? "#f44336" : "#ff9800";
    return "#90caf9";
  };

  return (
    <Box>
      <SortBars values={f.values} colorFor={colorFor} />
      <StepControls
        runner={runner}
        onShuffle={() => setInput(randomArray())}
        caption={f.done ? "sorted" : f.j >= 0 ? `compare j=${f.j}` : "start"}
      />
    </Box>
  );
};
