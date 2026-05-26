import {Box} from "@mui/material";
import {HIGHLIGHT_COLORS} from "./colors";
import {VisualizerPanel} from "./VisualizerPanel";

interface Props {
  values: number[];
  colorFor: (idx: number) => string;
  max?: number;
  height?: number;
}

export const SortBars = ({values, colorFor, max, height = 240}: Props) => {
  const ceiling = max ?? Math.max(...values, 1);
  return (
    <VisualizerPanel sx={{overflowX: "auto"}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 1,
          height,
          minWidth: "min-content",
          mx: "auto",
        }}
      >
        {values.map((value, idx) => (
          <Box
            key={idx}
            sx={{
              width: 32,
              flexShrink: 0,
              height: `${(value / ceiling) * 100}%`,
              backgroundColor: colorFor(idx),
              borderRadius: "4px 4px 0 0",
              transition: "height 120ms ease, background-color 120ms ease",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              color: HIGHLIGHT_COLORS.text,
              fontSize: 12,
              fontWeight: 600,
              pt: 0.5,
            }}
          >
            {value}
          </Box>
        ))}
      </Box>
    </VisualizerPanel>
  );
};
