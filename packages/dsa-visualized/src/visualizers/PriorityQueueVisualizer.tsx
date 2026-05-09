import {useRef, useState} from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {PriorityQueue} from "@camkerber/typescript-dsa/data-structures";

interface Item {
  value: number;
  priority: number;
}

const SEED: Item[] = [
  {value: 1, priority: 5},
  {value: 2, priority: 10},
  {value: 3, priority: 1},
];

const readPq = (pq: PriorityQueue<number>): Item[] =>
  (pq as unknown as {heap: {heap: Item[]}}).heap.heap.map((n) => ({...n}));

export const PriorityQueueVisualizer = () => {
  const pqRef = useRef<PriorityQueue<number>>(new PriorityQueue<number>(true));
  const initRef = useRef(false);
  if (!initRef.current) {
    SEED.forEach((s) => pqRef.current.enqueue(s.value, s.priority));
    initRef.current = true;
  }

  const [items, setItems] = useState<Item[]>(() => readPq(pqRef.current));
  const [valueInput, setValueInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("");
  const [lastResult, setLastResult] = useState("—");

  const sync = () => setItems(readPq(pqRef.current));

  const handleEnqueue = () => {
    const v = Number.parseInt(valueInput, 10);
    const p = Number.parseInt(priorityInput, 10);
    if (Number.isNaN(v) || Number.isNaN(p)) return;
    pqRef.current.enqueue(v, p);
    sync();
    setValueInput("");
    setPriorityInput("");
  };

  const handleDequeue = () => {
    const v = pqRef.current.dequeue();
    setLastResult(`dequeue → ${v ?? "undefined"}`);
    sync();
  };

  const handlePeek = () => {
    const v = pqRef.current.peek();
    setLastResult(`peek → ${v ?? "undefined"}`);
  };

  const head = items[0];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minHeight: 100,
          p: 2,
          backgroundColor: "background.default",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        <Typography variant="overline" sx={{color: "text.secondary", mr: 1}}>
          highest priority
        </Typography>
        {items.length === 0 ? (
          <Typography
            variant="body2"
            sx={{color: "text.secondary", fontStyle: "italic"}}
          >
            (empty)
          </Typography>
        ) : (
          items.map((item, idx) => (
            <Box
              key={`${idx}-${item.value}`}
              sx={{
                minWidth: 72,
                height: 64,
                borderRadius: 1,
                backgroundColor: idx === 0 ? "#ff9800" : "#90caf9",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(0,0,0,0.85)",
                fontWeight: 700,
                px: 1,
              }}
            >
              <Box sx={{fontSize: 18}}>{item.value}</Box>
              <Box sx={{fontSize: 10, opacity: 0.7}}>p={item.priority}</Box>
            </Box>
          ))
        )}
      </Box>

      <Stack
        direction="row"
        sx={{mt: 2, flexWrap: "wrap", alignItems: "center", gap: 1}}
      >
        <TextField
          size="small"
          label="value"
          type="number"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          sx={{width: 100}}
        />
        <TextField
          size="small"
          label="priority"
          type="number"
          value={priorityInput}
          onChange={(e) => setPriorityInput(e.target.value)}
          sx={{width: 100}}
        />
        <Button variant="contained" onClick={handleEnqueue}>
          Enqueue
        </Button>
        <Button
          variant="outlined"
          onClick={handleDequeue}
          disabled={items.length === 0}
        >
          Dequeue
        </Button>
        <Button
          variant="outlined"
          onClick={handlePeek}
          disabled={items.length === 0}
        >
          Peek
        </Button>
      </Stack>

      <Typography
        variant="caption"
        sx={{display: "block", mt: 2, color: "text.secondary"}}
      >
        size: {items.length} · head:{" "}
        {head ? `${head.value} (p=${head.priority})` : "—"} · {lastResult}
      </Typography>
      <Typography
        variant="caption"
        sx={{display: "block", mt: 0.5, color: "text.secondary"}}
      >
        Backed by a max-heap on priority. Items shown in their underlying heap
        order, not strict priority order.
      </Typography>
    </Box>
  );
};
