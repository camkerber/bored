import {useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useFlashHighlight} from "../hooks/useFlashHighlight";
import {useDelayedAction} from "../hooks/useDelayedAction";
import {DsaControlBar, HIGHLIGHT_COLORS, VisualizerPanel} from "./shared";

interface Props {
  doubly?: boolean;
}

const SEED = [10, 20, 30];

type FlashKind = "added" | "removed" | "got" | null;
const NEUTRAL: {idx: number; kind: FlashKind} = {idx: -1, kind: null};

const NodeBox = ({value, color}: {value: number; color: string}) => (
  <Box
    sx={{
      width: 64,
      height: 56,
      borderRadius: 1,
      backgroundColor: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: HIGHLIGHT_COLORS.text,
      fontWeight: 700,
      transition: "background-color 200ms ease",
      flexShrink: 0,
    }}
  >
    {value}
  </Box>
);

export const LinkedListVisualizer = ({doubly = false}: Props) => {
  const [items, setItems] = useState<number[]>(() => [...SEED]);
  const [valueInput, setValueInput] = useState("");
  const [indexInput, setIndexInput] = useState("0");
  const [highlight, flashHighlight] = useFlashHighlight(NEUTRAL, 800);
  const [lastResult, setLastResult] = useState<string>("—");
  const schedule = useDelayedAction();

  const parseValue = () => Number.parseInt(valueInput, 10);
  const parseIndex = () => Number.parseInt(indexInput, 10);

  const handlePrepend = () => {
    const v = parseValue();
    if (Number.isNaN(v)) return;
    setItems((prev) => [v, ...prev]);
    flashHighlight({idx: 0, kind: "added"});
    setValueInput("");
  };

  const handleAppend = () => {
    const v = parseValue();
    if (Number.isNaN(v)) return;
    setItems((prev) => [...prev, v]);
    flashHighlight({idx: items.length, kind: "added"});
    setValueInput("");
  };

  const handleInsertAt = () => {
    const v = parseValue();
    const idx = parseIndex();
    if (Number.isNaN(v) || Number.isNaN(idx)) return;
    if (idx < 0 || idx > items.length) {
      setLastResult("insertAt out of bounds");
      return;
    }
    setItems((prev) => [...prev.slice(0, idx), v, ...prev.slice(idx)]);
    flashHighlight({idx, kind: "added"});
    setValueInput("");
  };

  const handleRemove = () => {
    const v = parseValue();
    if (Number.isNaN(v)) return;
    const targetIdx = items.indexOf(v);
    if (targetIdx < 0) {
      setLastResult(`remove(${v}) → not found`);
      setValueInput("");
      return;
    }
    setLastResult(`remove(${v}) → ${v}`);
    flashHighlight({idx: targetIdx, kind: "removed"});
    schedule(() => {
      setItems((prev) => prev.filter((_, i) => i !== targetIdx));
    }, 250);
    setValueInput("");
  };

  const handleGet = () => {
    const idx = parseIndex();
    if (Number.isNaN(idx)) return;
    const v = idx >= 0 && idx < items.length ? items[idx] : undefined;
    setLastResult(`get(${idx}) → ${v ?? "undefined"}`);
    if (v !== undefined) flashHighlight({idx, kind: "got"});
  };

  const slotColor = (idx: number) => {
    if (highlight.idx !== idx) return HIGHLIGHT_COLORS.default;
    if (highlight.kind === "added") return HIGHLIGHT_COLORS.added;
    if (highlight.kind === "removed") return HIGHLIGHT_COLORS.removed;
    if (highlight.kind === "got") return HIGHLIGHT_COLORS.active;
    return HIGHLIGHT_COLORS.default;
  };

  return (
    <Box>
      <VisualizerPanel
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          minHeight: 100,
          overflowX: "auto",
        }}
      >
        <Typography variant="overline" sx={{color: "text.secondary", mr: 1}}>
          head
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
              sx={{display: "flex", alignItems: "center"}}
            >
              <NodeBox value={value} color={slotColor(idx)} />
              {idx < items.length - 1 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "text.secondary",
                  }}
                >
                  {doubly && (
                    <ArrowForwardIcon
                      sx={{transform: "rotate(180deg)", fontSize: 18}}
                    />
                  )}
                  <ArrowForwardIcon sx={{fontSize: 18}} />
                </Box>
              )}
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
            label: "index",
            value: indexInput,
            onChange: setIndexInput,
            width: 100,
          },
        ]}
        actions={[
          {label: "Prepend", onClick: handlePrepend, variant: "contained"},
          {label: "Append", onClick: handleAppend, variant: "contained"},
          {label: "Insert at", onClick: handleInsertAt},
          {label: "Remove", onClick: handleRemove},
          {label: "Get", onClick: handleGet},
        ]}
      />

      <Stack direction="row" spacing={3} sx={{mt: 2, color: "text.secondary"}}>
        <Typography variant="caption">length: {items.length}</Typography>
        <Typography variant="caption">{lastResult}</Typography>
      </Stack>
    </Box>
  );
};

export const DoublyLinkedListVisualizer = () => <LinkedListVisualizer doubly />;
