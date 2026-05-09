import {useRef, useState} from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import {Queue} from "@camkerber/typescript-dsa/data-structures";

type Highlight = "head" | "tail" | "removed" | null;

const SEED = [3, 7, 1];

export const QueueVisualizer = () => {
  const queueRef = useRef<Queue<number>>(new Queue<number>());
  const initRef = useRef(false);
  if (!initRef.current) {
    SEED.forEach((v) => queueRef.current.enqueue(v));
    initRef.current = true;
  }

  const [items, setItems] = useState<number[]>([...SEED]);
  const [input, setInput] = useState("");
  const [highlight, setHighlight] = useState<{idx: number; kind: Highlight}>({
    idx: -1,
    kind: null,
  });
  const [lastDequeued, setLastDequeued] = useState<number | undefined>(
    undefined,
  );
  const [lastPeeked, setLastPeeked] = useState<number | undefined>(undefined);

  const flashHighlight = (idx: number, kind: Highlight) => {
    setHighlight({idx, kind});
    window.setTimeout(() => setHighlight({idx: -1, kind: null}), 700);
  };

  const handleEnqueue = () => {
    const value = Number.parseInt(input, 10);
    if (Number.isNaN(value)) return;
    queueRef.current.enqueue(value);
    setItems((prev) => {
      const next = [...prev, value];
      flashHighlight(next.length - 1, "tail");
      return next;
    });
    setInput("");
  };

  const handleDequeue = () => {
    const dequeued = queueRef.current.dequeue();
    setLastDequeued(dequeued);
    if (dequeued === undefined) return;
    flashHighlight(0, "removed");
    window.setTimeout(() => {
      setItems((prev) => prev.slice(1));
    }, 250);
  };

  const handlePeek = () => {
    const value = queueRef.current.peek();
    setLastPeeked(value);
    if (value !== undefined) {
      flashHighlight(0, "head");
    }
  };

  const handleClear = () => {
    queueRef.current.clear();
    setItems([]);
    setLastDequeued(undefined);
    setLastPeeked(undefined);
  };

  const slotColor = (idx: number) => {
    if (highlight.idx === idx) {
      switch (highlight.kind) {
        case "head":
          return "#ff9800";
        case "tail":
          return "#4caf50";
        case "removed":
          return "#f44336";
      }
    }
    return "#90caf9";
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minHeight: 120,
          p: 2,
          backgroundColor: "background.default",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        <Typography variant="overline" sx={{color: "text.secondary", mr: 1}}>
          front
        </Typography>
        {items.length === 0 ? (
          <Typography
            variant="body2"
            sx={{color: "text.secondary", fontStyle: "italic"}}
          >
            (empty)
          </Typography>
        ) : (
          items.map((value, idx) => (
            <Box
              key={`${idx}-${value}`}
              sx={{
                width: 56,
                height: 56,
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
          ))
        )}
        <Typography variant="overline" sx={{color: "text.secondary", ml: 1}}>
          back
        </Typography>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEnqueue();
          }}
          sx={{width: 120}}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleEnqueue}
        >
          Enqueue
        </Button>
        <Button
          variant="outlined"
          startIcon={<RemoveIcon />}
          onClick={handleDequeue}
          disabled={items.length === 0}
        >
          Dequeue
        </Button>
        <Button
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={handlePeek}
          disabled={items.length === 0}
        >
          Peek
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<ClearAllIcon />}
          onClick={handleClear}
          disabled={items.length === 0}
        >
          Clear
        </Button>
      </Stack>

      <Stack direction="row" spacing={3} sx={{mt: 2, color: "text.secondary"}}>
        <Typography variant="caption">length: {items.length}</Typography>
        <Typography variant="caption">
          last dequeued: {lastDequeued ?? "—"}
        </Typography>
        <Typography variant="caption">
          last peeked: {lastPeeked ?? "—"}
        </Typography>
      </Stack>
    </Box>
  );
};
