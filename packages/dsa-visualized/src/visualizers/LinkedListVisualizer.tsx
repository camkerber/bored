import {useRef, useState} from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  LinkedList,
  DoublyLinkedList,
} from "@camkerber/typescript-dsa/data-structures";

interface Props {
  doubly?: boolean;
}

const SEED = [10, 20, 30];

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
      color: "rgba(0,0,0,0.85)",
      fontWeight: 700,
      transition: "background-color 200ms ease",
      flexShrink: 0,
    }}
  >
    {value}
  </Box>
);

export const LinkedListVisualizer = ({doubly = false}: Props) => {
  const listRef = useRef<LinkedList<number> | null>(null);
  if (listRef.current == null) {
    const list = (listRef.current = doubly ? new DoublyLinkedList<number>() : new LinkedList<number>());
    SEED.forEach((v) => list.append(v));
  }

  const [items, setItems] = useState<number[]>([...SEED]);
  const [valueInput, setValueInput] = useState("");
  const [indexInput, setIndexInput] = useState("0");
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [highlightKind, setHighlightKind] = useState<
    "added" | "removed" | "got" | null
  >(null);
  const [lastResult, setLastResult] = useState<string>("—");

  const flash = (idx: number, kind: "added" | "removed" | "got") => {
    setHighlightIdx(idx);
    setHighlightKind(kind);
    window.setTimeout(() => {
      setHighlightIdx(-1);
      setHighlightKind(null);
    }, 800);
  };

  const parseValue = () => Number.parseInt(valueInput, 10);
  const parseIndex = () => Number.parseInt(indexInput, 10);

  const handlePrepend = () => {
    const v = parseValue();
    if (Number.isNaN(v)) return;
    listRef.current!.prepend(v);
    setItems((prev) => {
      flash(0, "added");
      return [v, ...prev];
    });
    setValueInput("");
  };

  const handleAppend = () => {
    const v = parseValue();
    if (Number.isNaN(v)) return;
    listRef.current!.append(v);
    setItems((prev) => {
      flash(prev.length, "added");
      return [...prev, v];
    });
    setValueInput("");
  };

  const handleInsertAt = () => {
    const v = parseValue();
    const idx = parseIndex();
    if (Number.isNaN(v) || Number.isNaN(idx)) return;
    if (idx < 0 || idx > items.length) return;
    try {
      listRef.current!.insertAt(v, idx);
      setItems((prev) => {
        const next = [...prev.slice(0, idx), v, ...prev.slice(idx)];
        flash(idx, "added");
        return next;
      });
      setValueInput("");
    } catch {
      setLastResult("insertAt out of bounds");
    }
  };

  const handleRemove = () => {
    const v = parseValue();
    if (Number.isNaN(v)) return;
    const targetIdx = items.indexOf(v);
    try {
      const removed = listRef.current!.remove(v);
      setLastResult(`remove(${v}) → ${removed ?? "undefined"}`);
      if (targetIdx >= 0) {
        flash(targetIdx, "removed");
        window.setTimeout(() => {
          setItems((prev) => prev.filter((_, i) => i !== targetIdx));
        }, 250);
      }
      setValueInput("");
    } catch {
      setLastResult(`remove(${v}) → not found`);
    }
  };

  const handleGet = () => {
    const idx = parseIndex();
    if (Number.isNaN(idx)) return;
    const v = listRef.current!.get(idx);
    setLastResult(`get(${idx}) → ${v ?? "undefined"}`);
    if (v !== undefined) flash(idx, "got");
  };

  const slotColor = (idx: number) => {
    if (highlightIdx !== idx) return "#90caf9";
    if (highlightKind === "added") return "#4caf50";
    if (highlightKind === "removed") return "#f44336";
    if (highlightKind === "got") return "#ff9800";
    return "#90caf9";
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
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
          label="index"
          type="number"
          value={indexInput}
          onChange={(e) => setIndexInput(e.target.value)}
          sx={{width: 100}}
        />
        <Button variant="contained" onClick={handlePrepend}>
          Prepend
        </Button>
        <Button variant="contained" onClick={handleAppend}>
          Append
        </Button>
        <Button variant="outlined" onClick={handleInsertAt}>
          Insert at
        </Button>
        <Button variant="outlined" onClick={handleRemove}>
          Remove
        </Button>
        <Button variant="outlined" onClick={handleGet}>
          Get
        </Button>
      </Stack>

      <Stack direction="row" spacing={3} sx={{mt: 2, color: "text.secondary"}}>
        <Typography variant="caption">length: {items.length}</Typography>
        <Typography variant="caption">{lastResult}</Typography>
      </Stack>
    </Box>
  );
};

export const DoublyLinkedListVisualizer = () => <LinkedListVisualizer doubly />;
