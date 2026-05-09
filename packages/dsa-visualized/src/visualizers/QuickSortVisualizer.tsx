import {useCallback, useState} from "react";
import {Box} from "@mui/material";
import {useStepRunner} from "../hooks/useStepRunner";
import {SortBars, StepControls, randomArray} from "./shared";

interface Frame {
  values: number[];
  left: number;
  right: number;
  pivotIdx: number;
  i: number;
  j: number;
  settled: Set<number>;
  done: boolean;
}

const buildFrames = (input: number[]): Frame[] => {
  const arr = [...input];
  const settled = new Set<number>();
  const frames: Frame[] = [
    {
      values: [...arr],
      left: 0,
      right: arr.length - 1,
      pivotIdx: -1,
      i: -1,
      j: -1,
      settled: new Set(settled),
      done: false,
    },
  ];

  const partition = (left: number, right: number): number => {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
      frames.push({
        values: [...arr],
        left,
        right,
        pivotIdx: right,
        i,
        j,
        settled: new Set(settled),
        done: false,
      });
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        frames.push({
          values: [...arr],
          left,
          right,
          pivotIdx: right,
          i,
          j,
          settled: new Set(settled),
          done: false,
        });
      }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    frames.push({
      values: [...arr],
      left,
      right,
      pivotIdx: i + 1,
      i,
      j: right,
      settled: new Set(settled),
      done: false,
    });
    return i + 1;
  };

  const sort = (left: number, right: number) => {
    if (left < right) {
      const pivot = partition(left, right);
      settled.add(pivot);
      sort(left, pivot - 1);
      sort(pivot + 1, right);
    } else if (left === right) {
      settled.add(left);
    }
  };
  sort(0, arr.length - 1);

  for (let k = 0; k < arr.length; k++) settled.add(k);
  frames.push({
    values: [...arr],
    left: 0,
    right: arr.length - 1,
    pivotIdx: -1,
    i: -1,
    j: -1,
    settled: new Set(settled),
    done: true,
  });
  return frames;
};

export const QuickSortVisualizer = () => {
  const [input, setInput] = useState<number[]>(() => randomArray());
  const build = useCallback(() => buildFrames(input), [input]);
  const runner = useStepRunner<Frame>({
    buildFrames: build,
    initialSpeedMs: 280,
  });
  const f = runner.frame;

  const colorFor = (idx: number) => {
    if (f.done) return "#4caf50";
    if (f.settled.has(idx)) return "#4caf50";
    if (idx === f.pivotIdx) return "#ba68c8";
    if (idx === f.i) return "#ff9800";
    if (idx === f.j) return "#f44336";
    if (idx >= f.left && idx <= f.right) return "#90caf9";
    return "#cfd8dc";
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
            : `partition [${f.left}, ${f.right}] pivot=${f.pivotIdx >= 0 ? f.values[f.pivotIdx] : "?"}`
        }
      />
    </Box>
  );
};
