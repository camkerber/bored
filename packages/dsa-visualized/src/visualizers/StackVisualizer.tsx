import {useRef, useState} from "react";
import {
  Box,
  Button,
  Stack as MStack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import {Stack} from "@camkerber/typescript-dsa/data-structures";

type Highlight = "top" | "added" | "removed" | null;
const SEED = [1, 2, 3];

export const StackVisualizer = () => {
  const stackRef = useRef<Stack<number> | null>(null);
  if (stackRef.current == null) {
    const stack = (stackRef.current = new Stack<number>());
    SEED.forEach((v) => stack.push(v));
  }

  const [items, setItems] = useState<number[]>([...SEED]);
  const [input, setInput] = useState("");
  const [highlight, setHighlight] = useState<{idx: number; kind: Highlight}>({
    idx: -1,
    kind: null,
  });
  const [lastPopped, setLastPopped] = useState<number | undefined>();
  const [lastPeeked, setLastPeeked] = useState<number | undefined>();

  const flash = (idx: number, kind: Highlight) => {
    setHighlight({idx, kind});
    window.setTimeout(() => setHighlight({idx: -1, kind: null}), 700);
  };

  const handlePush = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    stackRef.current!.push(v);
    setItems((prev) => {
      const next = [...prev, v];
      flash(next.length - 1, "added");
      return next;
    });
    setInput("");
  };

  const handlePop = () => {
    const popped = stackRef.current!.pop();
    setLastPopped(popped);
    if (popped === undefined) return;
    flash(items.length - 1, "removed");
    window.setTimeout(() => setItems((prev) => prev.slice(0, -1)), 250);
  };

  const handlePeek = () => {
    const v = stackRef.current!.peek();
    setLastPeeked(v);
    if (v !== undefined) flash(items.length - 1, "top");
  };

  const handleClear = () => {
    stackRef.current!.clear();
    setItems([]);
    setLastPopped(undefined);
    setLastPeeked(undefined);
  };

  const slotColor = (idx: number) => {
    if (highlight.idx === idx) {
      if (highlight.kind === "top") return "#ff9800";
      if (highlight.kind === "added") return "#4caf50";
      if (highlight.kind === "removed") return "#f44336";
    }
    return "#90caf9";
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
          minHeight: 240,
          p: 2,
          backgroundColor: "background.default",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
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
                color: "rgba(0,0,0,0.85)",
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
      </Box>

      <MStack
        direction="row"
        sx={{mt: 2, flexWrap: "wrap", alignItems: "center", gap: 1}}
      >
        <TextField
          size="small"
          label="value"
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePush()}
          sx={{width: 120}}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handlePush}
        >
          Push
        </Button>
        <Button
          variant="outlined"
          startIcon={<RemoveIcon />}
          onClick={handlePop}
          disabled={items.length === 0}
        >
          Pop
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
      </MStack>

      <MStack direction="row" spacing={3} sx={{mt: 2, color: "text.secondary"}}>
        <Typography variant="caption">length: {items.length}</Typography>
        <Typography variant="caption">
          last popped: {lastPopped ?? "—"}
        </Typography>
        <Typography variant="caption">
          last peeked: {lastPeeked ?? "—"}
        </Typography>
      </MStack>
    </Box>
  );
};
