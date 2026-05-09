import {useRef, useState} from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {
  Heap,
  MinHeap,
  MaxHeap,
} from "@camkerber/typescript-dsa/data-structures";
import {TreeSvg, type PositionedNode} from "./shared/TreeSvg";

type HeapKind = "min" | "max" | "custom";

interface Props {
  kind: HeapKind;
}

const SEED_BY_KIND: Record<HeapKind, number[]> = {
  min: [10, 4, 15, 7, 2, 20],
  max: [10, 4, 15, 7, 2, 20],
  custom: [5, 3, 8, 1, 9, 4],
};

const makeHeap = (kind: HeapKind, values: number[]): Heap<number> => {
  switch (kind) {
    case "min":
      return new MinHeap<number>(values);
    case "max":
      return new MaxHeap<number>(values);
    case "custom": {
      const h = new Heap<number>((a, b) => a - b);
      h.heapify(values);
      return h;
    }
  }
};

const readArray = (heap: Heap<number>): number[] => [
  ...(heap as unknown as {heap: number[]}).heap,
];

const layoutHeap = (
  arr: number[],
  highlightedIndex: number,
  highlightKind: PositionedNode["highlight"],
): {nodes: PositionedNode[]; width: number; height: number} => {
  if (arr.length === 0) return {nodes: [], width: 320, height: 100};
  const depth = Math.floor(Math.log2(arr.length)) + 1;
  const levelGap = 64;
  const width = Math.max(2 ** depth * 40, 360);
  const height = depth * levelGap + 40;
  const nodes: PositionedNode[] = [];
  const positions: Array<{x: number; y: number}> = [];

  for (let i = 0; i < arr.length; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const indexInLevel = i - (2 ** level - 1);
    const slotsAtLevel = 2 ** level;
    const slotWidth = width / slotsAtLevel;
    const x = slotWidth * (indexInLevel + 0.5);
    const y = level * levelGap + 24;
    positions.push({x, y});
    const parent = i === 0 ? undefined : positions[(i - 1) >> 1];
    nodes.push({
      id: `n-${i}`,
      label: String(arr[i]),
      x,
      y,
      parentX: parent?.x,
      parentY: parent?.y,
      highlight: i === highlightedIndex ? highlightKind : "default",
    });
  }
  return {nodes, width, height};
};

const labelFor = (kind: HeapKind) =>
  kind === "min" ? "Min Heap" : kind === "max" ? "Max Heap" : "Heap";

const HeapVisualizerInner = ({kind}: Props) => {
  const heapRef = useRef<Heap<number>>(makeHeap(kind, SEED_BY_KIND[kind]));
  const [arr, setArr] = useState<number[]>(() => readArray(heapRef.current));
  const [input, setInput] = useState("");
  const [lastResult, setLastResult] = useState("—");
  const [highlight, setHighlight] = useState<{
    idx: number;
    kind: PositionedNode["highlight"];
  }>({idx: -1, kind: "default"});

  const sync = () => setArr(readArray(heapRef.current));

  const flash = (idx: number, kindHl: PositionedNode["highlight"]) => {
    setHighlight({idx, kind: kindHl});
    window.setTimeout(() => setHighlight({idx: -1, kind: "default"}), 800);
  };

  const handlePush = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    heapRef.current.push(v);
    sync();
    const next = readArray(heapRef.current);
    flash(next.indexOf(v), "added");
    setInput("");
  };

  const handlePop = () => {
    flash(0, "removed");
    window.setTimeout(() => {
      const popped = heapRef.current.pop();
      setLastResult(`pop → ${popped ?? "undefined"}`);
      sync();
    }, 250);
  };

  const handlePeek = () => {
    const v = heapRef.current.peek();
    setLastResult(`peek → ${v ?? "undefined"}`);
    if (arr.length > 0) flash(0, "found");
  };

  const handleHeapify = () => {
    const fresh = Array.from(
      {length: 6},
      () => Math.floor(Math.random() * 90) + 5,
    );
    heapRef.current.heapify(fresh);
    sync();
    setLastResult(`heapified ${fresh.join(", ")}`);
  };

  const handleClear = () => {
    heapRef.current = makeHeap(kind, []);
    sync();
    setLastResult("—");
  };

  const {nodes, width, height} = layoutHeap(arr, highlight.idx, highlight.kind);

  return (
    <Box>
      <TreeSvg nodes={nodes} width={width} height={height} />

      <Box
        sx={{
          mt: 2,
          p: 1.5,
          backgroundColor: "background.default",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        <Typography variant="caption" sx={{color: "text.secondary"}}>
          backing array
        </Typography>
        <Box sx={{display: "flex", gap: 0.5, mt: 0.5}}>
          {arr.length === 0 ? (
            <Typography
              variant="body2"
              sx={{color: "text.secondary", fontStyle: "italic"}}
            >
              (empty)
            </Typography>
          ) : (
            arr.map((v, i) => (
              <Box
                key={i}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1,
                  backgroundColor: i === highlight.idx ? "#ff9800" : "#cfd8dc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.85)",
                  transition: "background-color 200ms ease",
                }}
              >
                {v}
              </Box>
            ))
          )}
        </Box>
      </Box>

      <Stack
        direction="row"
        sx={{mt: 2, flexWrap: "wrap", alignItems: "center", gap: 1}}
      >
        <TextField
          size="small"
          label="value"
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{width: 100}}
        />
        <Button variant="contained" onClick={handlePush}>
          Push
        </Button>
        <Button
          variant="outlined"
          onClick={handlePop}
          disabled={arr.length === 0}
        >
          Pop
        </Button>
        <Button
          variant="outlined"
          onClick={handlePeek}
          disabled={arr.length === 0}
        >
          Peek
        </Button>
        <Button variant="outlined" onClick={handleHeapify}>
          Heapify random
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClear}
          disabled={arr.length === 0}
        >
          Clear
        </Button>
      </Stack>

      <Typography
        variant="caption"
        sx={{display: "block", mt: 2, color: "text.secondary"}}
      >
        {labelFor(kind)} · size: {arr.length} · {lastResult}
      </Typography>
    </Box>
  );
};

export const HeapVisualizer = () => <HeapVisualizerInner kind="custom" />;
export const MinHeapVisualizer = () => <HeapVisualizerInner kind="min" />;
export const MaxHeapVisualizer = () => <HeapVisualizerInner kind="max" />;
