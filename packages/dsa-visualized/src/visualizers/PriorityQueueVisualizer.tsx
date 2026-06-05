import {useState} from "react";
import {Box, Typography} from "@mui/material";
import {PriorityQueue} from "@camkerber/typescript-dsa/data-structures";
import {DsaControlBar, HIGHLIGHT_COLORS, VisualizerPanel} from "./shared";

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

const makePq = (): PriorityQueue<number> => {
  const pq = new PriorityQueue<number>(true);
  SEED.forEach((s) => pq.enqueue(s.value, s.priority));
  return pq;
};

export const PriorityQueueVisualizer = () => {
  const [pq] = useState<PriorityQueue<number>>(makePq);
  const [items, setItems] = useState<Item[]>(() => readPq(pq));
  const [valueInput, setValueInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("");
  const [lastResult, setLastResult] = useState("—");

  const sync = () => setItems(readPq(pq));

  const handleEnqueue = () => {
    const v = Number.parseInt(valueInput, 10);
    const p = Number.parseInt(priorityInput, 10);
    if (Number.isNaN(v) || Number.isNaN(p)) return;
    pq.enqueue(v, p);
    sync();
    setValueInput("");
    setPriorityInput("");
  };

  const handleDequeue = () => {
    const v = pq.dequeue();
    setLastResult(`dequeue → ${v ?? "undefined"}`);
    sync();
  };

  const handlePeek = () => {
    const v = pq.peek();
    setLastResult(`peek → ${v ?? "undefined"}`);
  };

  const head = items[0];

  return (
    <Box>
      <VisualizerPanel
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minHeight: 100,
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
                backgroundColor:
                  idx === 0
                    ? HIGHLIGHT_COLORS.active
                    : HIGHLIGHT_COLORS.default,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: HIGHLIGHT_COLORS.text,
                fontWeight: 700,
                px: 1,
              }}
            >
              <Box sx={{fontSize: 18}}>{item.value}</Box>
              <Box sx={{fontSize: 10, opacity: 0.7}}>p={item.priority}</Box>
            </Box>
          ))
        )}
      </VisualizerPanel>

      <DsaControlBar
        inputs={[
          {
            label: "value",
            value: valueInput,
            onChange: setValueInput,
            width: 100,
          },
          {
            label: "priority",
            value: priorityInput,
            onChange: setPriorityInput,
            width: 100,
          },
        ]}
        actions={[
          {label: "Enqueue", onClick: handleEnqueue, variant: "contained"},
          {
            label: "Dequeue",
            onClick: handleDequeue,
            disabled: items.length === 0,
          },
          {label: "Peek", onClick: handlePeek, disabled: items.length === 0},
        ]}
      />

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
