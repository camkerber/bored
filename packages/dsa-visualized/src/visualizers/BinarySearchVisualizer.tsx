import {useCallback, useState} from "react";
import {Box, Stack, TextField, Typography} from "@mui/material";
import {useStepRunner} from "../hooks/useStepRunner";
import {StepControls, randomSortedArray} from "./shared";

interface Frame {
  low: number;
  high: number;
  mid: number;
  found: boolean;
  exhausted: boolean;
}

const buildFrames = (arr: number[], target: number): Frame[] => {
  const frames: Frame[] = [];
  let low = 0;
  let high = arr.length - 1;
  frames.push({low, high, mid: -1, found: false, exhausted: false});
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    frames.push({low, high, mid, found: false, exhausted: false});
    if (arr[mid] === target) {
      frames.push({low, high, mid, found: true, exhausted: false});
      return frames;
    }
    if (target < arr[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
    frames.push({low, high, mid, found: false, exhausted: false});
  }
  frames.push({low, high, mid: -1, found: false, exhausted: true});
  return frames;
};

export const BinarySearchVisualizer = () => {
  const [arr, setArr] = useState<number[]>(() => randomSortedArray(12));
  const [targetInput, setTargetInput] = useState<string>(() =>
    String(arr[Math.floor(arr.length / 2)]),
  );
  const target = Number.parseInt(targetInput, 10);

  const build = useCallback(
    () =>
      Number.isNaN(target)
        ? [
            {
              low: 0,
              high: arr.length - 1,
              mid: -1,
              found: false,
              exhausted: false,
            },
          ]
        : buildFrames(arr, target),
    [arr, target],
  );
  const runner = useStepRunner<Frame>({
    buildFrames: build,
    initialSpeedMs: 500,
  });
  const f = runner.frame;

  const slotColor = (idx: number) => {
    if (f.found && idx === f.mid) return "#4caf50";
    if (idx === f.mid) return "#ba68c8";
    if (idx < f.low || idx > f.high) return "#cfd8dc";
    return "#90caf9";
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
        <TextField
          size="small"
          label="target"
          type="number"
          value={targetInput}
          onChange={(e) => setTargetInput(e.target.value)}
          sx={{width: 120}}
        />
        <Typography variant="caption" color="text.secondary">
          Edit target then press Reset / Play.
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minHeight: 80,
          p: 2,
          backgroundColor: "background.default",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        {arr.map((value, idx) => (
          <Box
            key={idx}
            sx={{
              minWidth: 44,
              height: 44,
              borderRadius: 1,
              backgroundColor: slotColor(idx),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(0,0,0,0.85)",
              fontWeight: 700,
              transition: "background-color 200ms ease",
            }}
          >
            {value}
          </Box>
        ))}
      </Box>
      <StepControls
        runner={runner}
        onShuffle={() => setArr(randomSortedArray(12))}
        caption={
          f.found
            ? `found ${target} at index ${f.mid}`
            : f.exhausted
              ? `${target} not present`
              : `low=${f.low} high=${f.high}${f.mid >= 0 ? ` mid=${f.mid}` : ""}`
        }
      />
    </Box>
  );
};
