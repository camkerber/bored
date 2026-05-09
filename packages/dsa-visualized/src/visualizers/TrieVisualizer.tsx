import {useMemo, useRef, useState} from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {Trie} from "@camkerber/typescript-dsa/data-structures";
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
      const next = {...root, isEnd: true, children: new Map(root.children)};
      return next;
    }
    return root;
  }
  const [head, ...rest] = word;
  const newChildren = new Map(root.children);
  const child = newChildren.get(head) ?? createNode(head);
  newChildren.set(head, addToMirror(child, rest.join("")));
  return {...root, children: newChildren};
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

export const TrieVisualizer = () => {
  const trieRef = useRef<Trie | null>(null);
  if (trieRef.current == null) {
    const trie = (trieRef.current = new Trie());
    SEED_WORDS.forEach((w) => trie.add(w));
  }
  const [root, setRoot] = useState<MirrorNode>(() =>
    SEED_WORDS.reduce((r, w) => addToMirror(r, w), createNode("·")),
  );
  const [input, setInput] = useState("");
  const [lastResult, setLastResult] = useState("—");
  const [highlightPath, setHighlightPath] = useState<Set<string>>(new Set());

  const handleAdd = () => {
    const w = input.trim().toLowerCase();
    if (!w) return;
    trieRef.current!.add(w);
    setRoot((prev) => addToMirror(prev, w));
    const path = new Set<string>();
    let acc = "";
    for (const c of w) {
      acc += c;
      path.add(acc);
    }
    setHighlightPath(path);
    window.setTimeout(() => setHighlightPath(new Set()), 900);
    setLastResult(`added "${w}"`);
    setInput("");
  };

  const handleFind = () => {
    const w = input.trim().toLowerCase();
    if (!w) return;
    const found = trieRef.current!.find(w);
    setLastResult(`find("${w}") → ${found}`);
    if (found) {
      const path = new Set<string>();
      let acc = "";
      for (const c of w) {
        acc += c;
        path.add(acc);
      }
      setHighlightPath(path);
      window.setTimeout(() => setHighlightPath(new Set()), 900);
    }
    setInput("");
  };

  const {nodes, width, height} = useMemo(
    () => layoutTrie(root, highlightPath),
    [root, highlightPath],
  );

  return (
    <Box>
      <TreeSvg nodes={nodes} width={width} height={height} />
      <Stack
        direction="row"
        sx={{mt: 2, flexWrap: "wrap", alignItems: "center", gap: 1}}
      >
        <TextField
          size="small"
          label="word"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          sx={{width: 160}}
        />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
        <Button variant="outlined" onClick={handleFind}>
          Find
        </Button>
      </Stack>
      <Typography
        variant="caption"
        sx={{display: "block", mt: 2, color: "text.secondary"}}
      >
        Green nodes mark the end of a stored word. {lastResult}
      </Typography>
    </Box>
  );
};
