import {useState} from "react";
import {Box, Typography} from "@mui/material";
import {useFlashHighlight} from "../hooks/useFlashHighlight";
import {DsaControlBar} from "./shared";
import {TreeSvg, type PositionedNode} from "./shared/TreeSvg";

interface MirrorNode {
  char: string;
  children: Map<string, MirrorNode>;
  isEnd: boolean;
}

const createNode = (char: string): MirrorNode => ({
  char,
  children: new Map(),
  isEnd: false,
});

const addToMirror = (root: MirrorNode, word: string): MirrorNode => {
  if (word.length === 0) {
    if (!root.isEnd) {
      return {...root, isEnd: true, children: new Map(root.children)};
    }
    return root;
  }
  const [head, ...rest] = word;
  const newChildren = new Map(root.children);
  const child = newChildren.get(head) ?? createNode(head);
  newChildren.set(head, addToMirror(child, rest.join("")));
  return {...root, children: newChildren};
};

const findInMirror = (root: MirrorNode, word: string): boolean => {
  let node = root;
  for (const c of word) {
    const next = node.children.get(c);
    if (!next) return false;
    node = next;
  }
  return node.isEnd;
};

const collectWidth = (node: MirrorNode): number => {
  if (node.children.size === 0) return 1;
  let total = 0;
  node.children.forEach((c) => (total += collectWidth(c)));
  return total;
};

const collectDepth = (node: MirrorNode): number => {
  if (node.children.size === 0) return 1;
  let max = 0;
  node.children.forEach((c) => (max = Math.max(max, collectDepth(c))));
  return 1 + max;
};

const layoutTrie = (
  root: MirrorNode,
  highlight: Set<string>,
): {nodes: PositionedNode[]; width: number; height: number} => {
  const totalWidth = collectWidth(root);
  const depth = collectDepth(root);
  const slotW = 56;
  const levelGap = 64;
  const width = Math.max(totalWidth * slotW, 320);
  const height = depth * levelGap + 40;
  const nodes: PositionedNode[] = [];

  const walk = (
    node: MirrorNode,
    level: number,
    xMin: number,
    xMax: number,
    parent: {x: number; y: number} | undefined,
    path: string,
  ) => {
    const x = (xMin + xMax) / 2;
    const y = level * levelGap + 24;
    const id = `${path}-${level}`;
    if (level > 0) {
      nodes.push({
        id,
        label: node.char,
        x,
        y,
        parentX: parent?.x,
        parentY: parent?.y,
        highlight: highlight.has(path)
          ? "found"
          : node.isEnd
            ? "added"
            : "default",
      });
    } else {
      nodes.push({id: "root", label: "·", x, y, highlight: "default"});
    }
    const sortedChildren = [...node.children.values()].sort((a, b) =>
      a.char.localeCompare(b.char),
    );
    let cursor = xMin;
    sortedChildren.forEach((child) => {
      const childWidth = (collectWidth(child) / totalWidth) * width;
      walk(
        child,
        level + 1,
        cursor,
        cursor + childWidth,
        {x, y},
        path + child.char,
      );
      cursor += childWidth;
    });
  };
  walk(root, 0, 0, width, undefined, "");
  return {nodes, width, height};
};

const SEED_WORDS = ["cat", "car", "dog"];
const EMPTY_PATH: Set<string> = new Set();

const seedRoot = (): MirrorNode =>
  SEED_WORDS.reduce((r, w) => addToMirror(r, w), createNode("·"));

const pathSet = (word: string): Set<string> => {
  const set = new Set<string>();
  let acc = "";
  for (const c of word) {
    acc += c;
    set.add(acc);
  }
  return set;
};

export const TrieVisualizer = () => {
  const [root, setRoot] = useState<MirrorNode>(seedRoot);
  const [input, setInput] = useState("");
  const [lastResult, setLastResult] = useState("—");
  const [highlightPath, flashHighlightPath] = useFlashHighlight(
    EMPTY_PATH,
    900,
  );

  const handleAdd = () => {
    const w = input.trim().toLowerCase();
    if (!w) return;
    setRoot((prev) => addToMirror(prev, w));
    flashHighlightPath(pathSet(w));
    setLastResult(`added "${w}"`);
    setInput("");
  };

  const handleFind = () => {
    const w = input.trim().toLowerCase();
    if (!w) return;
    const found = findInMirror(root, w);
    setLastResult(`find("${w}") → ${found}`);
    if (found) flashHighlightPath(pathSet(w));
    setInput("");
  };

  const {nodes, width, height} = layoutTrie(root, highlightPath);

  return (
    <Box>
      <TreeSvg nodes={nodes} width={width} height={height} />
      <DsaControlBar
        inputs={[
          {
            label: "word",
            value: input,
            onChange: setInput,
            type: "text",
            width: 160,
            onEnter: handleAdd,
          },
        ]}
        actions={[
          {label: "Add", onClick: handleAdd, variant: "contained"},
          {label: "Find", onClick: handleFind},
        ]}
      />
      <Typography
        variant="caption"
        sx={{display: "block", mt: 2, color: "text.secondary"}}
      >
        Green nodes mark the end of a stored word. {lastResult}
      </Typography>
    </Box>
  );
};
