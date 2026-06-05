import {useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import {useFlashHighlight} from "../hooks/useFlashHighlight";
import {useDelayedAction} from "../hooks/useDelayedAction";
import {DsaControlBar, HIGHLIGHT_COLORS, VisualizerPanel} from "./shared";

type Highlight = "head" | "tail" | "removed" | null;

const SEED = [3, 7, 1];
const NEUTRAL: {idx: number; kind: Highlight} = {idx: -1, kind: null};

export const QueueVisualizer = () => {
  const [items, setItems] = useState<number[]>(() => [...SEED]);
  const [input, setInput] = useState("");
  const [highlight, flashHighlight] = useFlashHighlight(NEUTRAL, 700);
  const [lastDequeued, setLastDequeued] = useState<number | undefined>(
    undefined,
  );
  const [lastPeeked, setLastPeeked] = useState<number | undefined>(undefined);
  const schedule = useDelayedAction();

  const handleEnqueue = () => {
    const value = Number.parseInt(input, 10);
    if (Number.isNaN(value)) return;
    setItems((prev) => [...prev, value]);
    flashHighlight({idx: items.length, kind: "tail"});
    setInput("");
  };

  const handleDequeue = () => {
    if (items.length === 0) return;
    const dequeued = items[0];
    setLastDequeued(dequeued);
    flashHighlight({idx: 0, kind: "removed"});
    schedule(() => setItems((prev) => prev.slice(1)), 250);
  };

  const handlePeek = () => {
    if (items.length === 0) return;
    const value = items[0];
    setLastPeeked(value);
    flashHighlight({idx: 0, kind: "head"});
  };

  const handleClear = () => {
    setItems([]);
    setLastDequeued(undefined);
    setLastPeeked(undefined);
  };

  const slotColor = (idx: number) => {
    if (highlight.idx === idx) {
      switch (highlight.kind) {
        case "head":
          return HIGHLIGHT_COLORS.active;
        case "tail":
          return HIGHLIGHT_COLORS.added;
        case "removed":
          return HIGHLIGHT_COLORS.removed;
      }
    }
    return HIGHLIGHT_COLORS.default;
  };

  return (
    <Box>
      <VisualizerPanel
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minHeight: 120,
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
                color: HIGHLIGHT_COLORS.text,
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
      </VisualizerPanel>

      <DsaControlBar
        inputs={[
          {
            label: "value",
            value: input,
            onChange: setInput,
            onEnter: handleEnqueue,
          },
        ]}
        actions={[
          {
            label: "Enqueue",
            onClick: handleEnqueue,
            variant: "contained",
            icon: <AddIcon />,
          },
          {
            label: "Dequeue",
            onClick: handleDequeue,
            icon: <RemoveIcon />,
            disabled: items.length === 0,
          },
          {
            label: "Peek",
            onClick: handlePeek,
            icon: <VisibilityIcon />,
            disabled: items.length === 0,
          },
          {
            label: "Clear",
            onClick: handleClear,
            color: "error",
            icon: <ClearAllIcon />,
            disabled: items.length === 0,
          },
        ]}
      />

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
