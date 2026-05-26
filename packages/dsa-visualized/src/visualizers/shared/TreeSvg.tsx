import {Box} from "@mui/material";
import {HIGHLIGHT_COLORS} from "./colors";
import {VisualizerPanel} from "./VisualizerPanel";

export interface TreeNode {
  id: string;
  label: string;
  highlight?: "default" | "found" | "added" | "removed" | "path";
}

export interface PositionedNode extends TreeNode {
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
}

interface Props {
  nodes: PositionedNode[];
  width: number;
  height: number;
  nodeRadius?: number;
}

const colorFor = (h: TreeNode["highlight"]) => {
  switch (h) {
    case "found":
    case "added":
      return HIGHLIGHT_COLORS.added;
    case "removed":
      return HIGHLIGHT_COLORS.removed;
    case "path":
      return HIGHLIGHT_COLORS.active;
    default:
      return HIGHLIGHT_COLORS.default;
  }
};

export const TreeSvg = ({nodes, width, height, nodeRadius = 18}: Props) => (
  <VisualizerPanel>
    {nodes.length === 0 ? (
      <Box
        sx={{
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        (empty)
      </Box>
    ) : (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          display: "block",
          width: "100%",
          maxWidth: width,
          height: "auto",
          margin: "0 auto",
        }}
      >
        {nodes.map((n) =>
          n.parentX !== undefined && n.parentY !== undefined ? (
            <line
              key={`l-${n.id}`}
              x1={n.parentX}
              y1={n.parentY}
              x2={n.x}
              y2={n.y}
              stroke={HIGHLIGHT_COLORS.edge}
              strokeWidth={1.5}
            />
          ) : null,
        )}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={nodeRadius}
              fill={colorFor(n.highlight)}
              stroke={HIGHLIGHT_COLORS.nodeStroke}
              strokeWidth={1}
              style={{transition: "fill 250ms ease"}}
            />
            <text
              x={n.x}
              y={n.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
              fontWeight={700}
              fill={HIGHLIGHT_COLORS.text}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    )}
  </VisualizerPanel>
);
