import {useState} from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {useFlashHighlight} from "../hooks/useFlashHighlight";
import {TreeSvg, type PositionedNode} from "./shared/TreeSvg";

interface MirrorNode {
  value: number;
  left?: MirrorNode;
  right?: MirrorNode;
}

const insertMirror = (
  root: MirrorNode | undefined,
  value: number,
): MirrorNode => {
  if (!root) return {value};
  if (value < root.value)
    return {...root, left: insertMirror(root.left, value)};
  if (value > root.value)
    return {...root, right: insertMirror(root.right, value)};
  return root;
};

const removeMirror = (
  root: MirrorNode | undefined,
  value: number,
): MirrorNode | undefined => {
  if (!root) return undefined;
  if (value < root.value)
    return {...root, left: removeMirror(root.left, value)};
  if (value > root.value)
    return {...root, right: removeMirror(root.right, value)};
  if (!root.left) return root.right;
  if (!root.right) return root.left;
  let successor = root.right;
  while (successor.left) successor = successor.left;
  return {
    value: successor.value,
    left: root.left,
    right: removeMirror(root.right, successor.value),
  };
};

const containsMirror = (
  root: MirrorNode | undefined,
  value: number,
): boolean => {
  if (!root) return false;
  if (value === root.value) return true;
  return value < root.value
    ? containsMirror(root.left, value)
    : containsMirror(root.right, value);
};

const findMinValue = (root: MirrorNode | undefined): number | undefined => {
  if (!root) return undefined;
  let node = root;
  while (node.left) node = node.left;
  return node.value;
};

const findMaxValue = (root: MirrorNode | undefined): number | undefined => {
  if (!root) return undefined;
  let node = root;
  while (node.right) node = node.right;
  return node.value;
};

const collectDepth = (root: MirrorNode | undefined): number => {
  if (!root) return 0;
  return 1 + Math.max(collectDepth(root.left), collectDepth(root.right));
};

const layout = (
  root: MirrorNode | undefined,
  highlightedValues: Map<number, PositionedNode["highlight"]>,
): {nodes: PositionedNode[]; width: number; height: number} => {
  if (!root) return {nodes: [], width: 100, height: 100};
  const depth = collectDepth(root);
  const levelGap = 64;
  const minLeafGap = 48;
  const width = Math.max(2 ** depth * minLeafGap, 320);
  const height = depth * levelGap + 40;
  const nodes: PositionedNode[] = [];

  const walk = (
    node: MirrorNode,
    level: number,
    xMin: number,
    xMax: number,
    parent?: {x: number; y: number},
  ) => {
    const x = (xMin + xMax) / 2;
    const y = level * levelGap + 24;
    const id = `${node.value}-${level}-${x.toFixed(0)}`;
    nodes.push({
      id,
      label: String(node.value),
      x,
      y,
      parentX: parent?.x,
      parentY: parent?.y,
      highlight: highlightedValues.get(node.value) ?? "default",
    });
    if (node.left) walk(node.left, level + 1, xMin, x, {x, y});
    if (node.right) walk(node.right, level + 1, x, xMax, {x, y});
  };
  walk(root, 0, 0, width);
  return {nodes, width, height};
};

const SEED = [50, 30, 70, 20, 40, 60, 80];
const EMPTY_HIGHLIGHT: Map<number, PositionedNode["highlight"]> = new Map();

const seedRoot = (): MirrorNode | undefined =>
  SEED.reduce<MirrorNode | undefined>(
    (acc, v) => insertMirror(acc, v),
    undefined,
  );

export const BinarySearchTreeVisualizer = () => {
  const [root, setRoot] = useState<MirrorNode | undefined>(seedRoot);
  const [input, setInput] = useState("");
  const [highlight, flashHighlight] = useFlashHighlight(EMPTY_HIGHLIGHT, 800);
  const [lastResult, setLastResult] = useState("—");

  const handleInsert = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    setRoot((prev) => insertMirror(prev, v));
    flashHighlight(new Map([[v, "added"]]));
    setInput("");
  };

  const handleRemove = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    if (!containsMirror(root, v)) {
      setLastResult(`${v} not found`);
      setInput("");
      return;
    }
    setLastResult(`removed ${v}`);
    flashHighlight(new Map([[v, "removed"]]));
    window.setTimeout(() => setRoot((prev) => removeMirror(prev, v)), 250);
    setInput("");
  };

  const handleFindMin = () => {
    const v = findMinValue(root);
    setLastResult(`findMin → ${v ?? "undefined"}`);
    if (v !== undefined) flashHighlight(new Map([[v, "found"]]));
  };

  const handleFindMax = () => {
    const v = findMaxValue(root);
    setLastResult(`findMax → ${v ?? "undefined"}`);
    if (v !== undefined) flashHighlight(new Map([[v, "found"]]));
  };

  const {nodes, width, height} = layout(root, highlight);

  return (
    <Box>
      <TreeSvg nodes={nodes} width={width} height={height} />
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
          sx={{width: 120}}
        />
        <Button variant="contained" onClick={handleInsert}>
          Insert
        </Button>
        <Button variant="outlined" onClick={handleRemove}>
          Remove
        </Button>
        <Button variant="outlined" onClick={handleFindMin}>
          findMin
        </Button>
        <Button variant="outlined" onClick={handleFindMax}>
          findMax
        </Button>
      </Stack>
      <Typography
        variant="caption"
        sx={{display: "block", mt: 2, color: "text.secondary"}}
      >
        {lastResult} · size: {nodes.length}
      </Typography>
    </Box>
  );
};
