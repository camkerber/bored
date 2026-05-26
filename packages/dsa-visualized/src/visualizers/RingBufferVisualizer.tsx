import {useState} from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {RingBuffer} from "@camkerber/typescript-dsa/data-structures";
import {HIGHLIGHT_COLORS, VisualizerPanel} from "./shared";

const CAPACITY = 6;
const SEED = [10, 20, 30];

interface Snapshot {
  buffer: (number | undefined)[];
  head: number;
  tail: number;
  length: number;
}

const readSnapshot = (rb: RingBuffer<number>): Snapshot => {
  const inner = rb as unknown as {
    buffer: (number | undefined)[];
    head: number;
    tail: number;
    length: number;
  };
  return {
    buffer: [...inner.buffer],
    head: inner.head,
    tail: inner.tail,
    length: inner.length,
  };
};

const makeRingBuffer = (): RingBuffer<number> => {
  const rb = new RingBuffer<number>(CAPACITY);
  SEED.forEach((v) => rb.enqueue(v));
  return rb;
};

export const RingBufferVisualizer = () => {
  const [rb] = useState<RingBuffer<number>>(makeRingBuffer);
  const [snap, setSnap] = useState<Snapshot>(() => readSnapshot(rb));
  const [input, setInput] = useState("");
  const [lastResult, setLastResult] = useState("—");

  const sync = () => setSnap(readSnapshot(rb));

  const handleEnqueue = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    const wasFull = snap.length === CAPACITY;
    rb.enqueue(v);
    sync();
    setLastResult(wasFull ? `enqueue ${v} (overwrote oldest)` : `enqueue ${v}`);
    setInput("");
  };

  const handleDequeue = () => {
    const v = rb.dequeue();
    sync();
    setLastResult(`dequeue → ${v ?? "undefined"}`);
  };

  const handlePeek = () => {
    const v = rb.peek();
    setLastResult(`peek → ${v ?? "undefined"}`);
  };

  const handleClear = () => {
    rb.clear();
    sync();
    setLastResult("cleared");
  };

  const radius = 110;
  const center = 140;
  const svgSize = 280;

  return (
    <Box>
      <VisualizerPanel
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <svg width={svgSize} height={svgSize}>
          <circle
            cx={center}
            cy={center}
            r={radius + 30}
            fill="none"
            stroke={HIGHLIGHT_COLORS.outside}
            strokeDasharray="4 4"
          />
          {snap.buffer.map((value, i) => {
            const angle = (i / CAPACITY) * Math.PI * 2 - Math.PI / 2;
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;
            const isHead = i === snap.head && snap.length > 0;
            const isTail =
              i === snap.tail && snap.length > 0 && snap.length < CAPACITY;
            const isOccupied = value !== undefined;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={22}
                  fill={
                    isOccupied
                      ? isHead
                        ? HIGHLIGHT_COLORS.active
                        : HIGHLIGHT_COLORS.default
                      : HIGHLIGHT_COLORS.surface
                  }
                  stroke={
                    isHead
                      ? "#e65100"
                      : isTail
                        ? "#2e7d32"
                        : HIGHLIGHT_COLORS.edge
                  }
                  strokeWidth={isHead || isTail ? 2.5 : 1}
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={13}
                  fontWeight={700}
                  fill={HIGHLIGHT_COLORS.text}
                >
                  {value ?? ""}
                </text>
                <text
                  x={x}
                  y={y - 38}
                  textAnchor="middle"
                  fontSize={10}
                  fill="#607d8b"
                >
                  {isHead ? "head" : isTail ? "tail" : `[${i}]`}
                </text>
              </g>
            );
          })}
        </svg>
      </VisualizerPanel>

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
        <Button variant="contained" onClick={handleEnqueue}>
          Enqueue
        </Button>
        <Button
          variant="outlined"
          onClick={handleDequeue}
          disabled={snap.length === 0}
        >
          Dequeue
        </Button>
        <Button
          variant="outlined"
          onClick={handlePeek}
          disabled={snap.length === 0}
        >
          Peek
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClear}
          disabled={snap.length === 0}
        >
          Clear
        </Button>
      </Stack>

      <Typography
        variant="caption"
        sx={{display: "block", mt: 2, color: "text.secondary"}}
      >
        capacity: {CAPACITY} · length: {snap.length} · head: {snap.head} · tail:{" "}
        {snap.tail} · {lastResult}
      </Typography>
    </Box>
  );
};
