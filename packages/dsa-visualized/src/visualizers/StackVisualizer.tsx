import {useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import {useFlashHighlight} from "../hooks/useFlashHighlight";
import {useDelayedAction} from "../hooks/useDelayedAction";
import {DsaControlBar, HIGHLIGHT_COLORS, VisualizerPanel} from "./shared";

type Highlight = "top" | "added" | "removed" | null;
const SEED = [1, 2, 3];
const NEUTRAL: {idx: number; kind: Highlight} = {idx: -1, kind: null};

export const StackVisualizer = () => {
  const [items, setItems] = useState<number[]>(() => [...SEED]);
  const [input, setInput] = useState("");
  const [highlight, flashHighlight] = useFlashHighlight(NEUTRAL, 700);
  const [lastPopped, setLastPopped] = useState<number | undefined>();
  const [lastPeeked, setLastPeeked] = useState<number | undefined>();
  const schedule = useDelayedAction();

  const handlePush = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    setItems((prev) => [...prev, v]);
    flashHighlight({idx: items.length, kind: "added"});
    setInput("");
  };

  const handlePop = () => {
    if (items.length === 0) return;
    const popped = items[items.length - 1];
    setLastPopped(popped);
    flashHighlight({idx: items.length - 1, kind: "removed"});
    schedule(() => setItems((prev) => prev.slice(0, -1)), 250);
  };

  const handlePeek = () => {
    if (items.length === 0) return;
    const v = items[items.length - 1];
    setLastPeeked(v);
    flashHighlight({idx: items.length - 1, kind: "top"});
  };

  const handleClear = () => {
    setItems([]);
    setLastPopped(undefined);
    setLastPeeked(undefined);
  };

  const slotColor = (idx: number) => {
    if (highlight.idx === idx) {
      if (highlight.kind === "top") return HIGHLIGHT_COLORS.active;
      if (highlight.kind === "added") return HIGHLIGHT_COLORS.added;
      if (highlight.kind === "removed") return HIGHLIGHT_COLORS.removed;
    }
    return HIGHLIGHT_COLORS.default;
  };

  return (
    <Box>
      <VisualizerPanel
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
          minHeight: 240,
        }}
      >
        <Typography variant="overline" sx={{color: "text.secondary"}}>
          bottom
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
                width: 96,
                height: 36,
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
        <Typography variant="overline" sx={{color: "text.secondary"}}>
          top
        </Typography>
      </VisualizerPanel>

      <DsaControlBar
        inputs={[
          {
            label: "value",
            value: input,
            onChange: setInput,
            onEnter: handlePush,
          },
        ]}
        actions={[
          {
            label: "Push",
            onClick: handlePush,
            variant: "contained",
            icon: <AddIcon />,
          },
          {
            label: "Pop",
            onClick: handlePop,
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
          last popped: {lastPopped ?? "—"}
        </Typography>
        <Typography variant="caption">
          last peeked: {lastPeeked ?? "—"}
        </Typography>
      </Stack>
    </Box>
  );
};
