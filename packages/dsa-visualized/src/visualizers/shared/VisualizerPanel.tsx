import {Box} from "@mui/material";
import type {SxProps, Theme} from "@mui/material/styles";
import type {ReactNode} from "react";

type SxItem = Exclude<SxProps<Theme>, ReadonlyArray<unknown>>;
type SxArrayItem = boolean | SxItem;

interface Props {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const baseSx: SxItem = {
  p: 2,
  backgroundColor: "background.default",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 2,
};

const toList = (s: SxProps<Theme>): ReadonlyArray<SxArrayItem> =>
  Array.isArray(s) ? (s as ReadonlyArray<SxArrayItem>) : [s as SxItem];

export const VisualizerPanel = ({children, sx}: Props) => {
  const merged: SxProps<Theme> =
    sx === undefined ? baseSx : [baseSx, ...toList(sx)];
  return <Box sx={merged}>{children}</Box>;
};
