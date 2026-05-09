import {useCallback, useState} from "react";
import {Box} from "@mui/material";
import {useStepRunner} from "../hooks/useStepRunner";
import {SortBars, StepControls, randomArray} from "./shared";

interface Frame {
  values: number[];
  i: number;
  position: number;
  inserting?: number;
  done: boolean;
}

const buildFrames = (input: number[]): Frame[] => {
  const arr = [...input];
  const frames: Frame[] = [
    {values: [...arr], i: -1, position: -1, done: false},
  ];
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i];
    let position = i - 1;
    frames.push({values: [...arr], i, position, inserting: temp, done: false});
    while (position >= 0 && arr[position] > temp) {
      arr[position + 1] = arr[position];
      position -= 1;
      frames.push({
        values: [...arr],
        i,
        position,
        inserting: temp,
        done: false,
      });
    }
    arr[position + 1] = temp;
    frames.push({
      values: [...arr],
      i,
      position: position + 1,
      inserting: temp,
      done: false,
    });
  }
  frames.push({values: [...arr], i: arr.length, position: -1, done: true});
  return frames;
};

export const InsertionSortVisualizer = () => {
  const [input, setInput] = useState<number[]>(() => randomArray());
  const build = useCallback(() => buildFrames(input), [input]);
  const runner = useStepRunner<Frame>({
    buildFrames: build,
    initialSpeedMs: 220,
  });
  const f = runner.frame;

  const colorFor = (idx: number) => {
    if (f.done) return "#4caf50";
    if (idx < f.i) return "#4caf50";
    if (idx === f.position + 1) return "#f44336";
    if (idx === f.i) return "#ff9800";
    return "#90caf9";
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
            : f.inserting !== undefined
              ? `inserting ${f.inserting}`
              : "start"
        }
      />
    </Box>
  );
};
