import {useCallback, useState} from "react";
import {Box, Stack, TextField, Typography} from "@mui/material";
import {useStepRunner} from "../hooks/useStepRunner";
import {SortBars, StepControls, randomArray} from "./shared";

interface Frame {
  values: number[];
  left: number;
  right: number;
  pivotIdx: number;
  i: number;
  j: number;
  k: number;
  result?: number;
  done: boolean;
}

const buildFrames = (input: number[], k: number): Frame[] => {
  const arr = [...input];
  const frames: Frame[] = [
    {
      values: [...arr],
      left: 0,
      right: arr.length - 1,
      pivotIdx: -1,
      i: -1,
      j: -1,
      k,
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
        k,
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
          k,
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
      k,
      done: false,
    });
    return i + 1;
  };

  const find = (left: number, right: number): number => {
    if (right - left <= 0) return arr[left];
    const pivotIdx = partition(left, right);
    if (k < pivotIdx) return find(left, pivotIdx - 1);
    if (k > pivotIdx) return find(pivotIdx + 1, right);
    return arr[pivotIdx];
  };

  const result = find(0, arr.length - 1);
  frames.push({
    values: [...arr],
    left: 0,
    right: arr.length - 1,
    pivotIdx: k,
    i: -1,
    j: -1,
    k,
    result,
    done: true,
  });
  return frames;
};

export const QuickSelectVisualizer = () => {
  const [input, setInput] = useState<number[]>(() => randomArray(10));
  const [kInput, setKInput] = useState("3");
  const k = Math.min(
    Math.max(Number.parseInt(kInput, 10) || 0, 0),
    input.length - 1,
  );

  const build = useCallback(() => buildFrames(input, k), [input, k]);
  const runner = useStepRunner<Frame>({
    buildFrames: build,
    initialSpeedMs: 320,
  });
  const f = runner.frame;

  const colorFor = (idx: number) => {
    if (f.done && idx === k) return "#4caf50";
    if (idx === f.pivotIdx) return "#ba68c8";
    if (idx === f.i) return "#ff9800";
    if (idx === f.j) return "#f44336";
    if (idx === k) return "#ffd54f";
    if (idx >= f.left && idx <= f.right) return "#90caf9";
    return "#cfd8dc";
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
        <TextField
          size="small"
          label="k (0-indexed)"
          type="number"
          value={kInput}
          onChange={(e) => setKInput(e.target.value)}
          sx={{width: 140}}
        />
        <Typography variant="caption" color="text.secondary">
          Yellow column is target index k. Edit k then press Reset.
        </Typography>
      </Stack>
      <SortBars values={f.values} colorFor={colorFor} />
      <StepControls
        runner={runner}
        onShuffle={() => setInput(randomArray(10))}
        caption={
          f.done
            ? `${k}th smallest = ${f.result}`
            : `partition [${f.left}, ${f.right}] pivot=${f.pivotIdx >= 0 ? f.values[f.pivotIdx] : "?"}`
        }
      />
    </Box>
  );
};
