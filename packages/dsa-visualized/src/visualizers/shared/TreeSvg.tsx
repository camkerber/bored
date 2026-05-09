import {Box} from "@mui/material";

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
      return "#4caf50";
    case "removed":
      return "#f44336";
    case "path":
      return "#ff9800";
    default:
      return "#90caf9";
  }
};

export const TreeSvg = ({nodes, width, height, nodeRadius = 18}: Props) => (
  <Box
    sx={{
      p: 2,
      backgroundColor: "background.default",
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 2,
    }}
  >
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
              stroke="#90a4ae"
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
              stroke="#37474f"
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
              fill="rgba(0,0,0,0.85)"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    )}
  </Box>
);
