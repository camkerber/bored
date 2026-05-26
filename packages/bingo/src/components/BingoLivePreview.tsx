import {Typography} from "@mui/material";
import {useWatch, type Control} from "react-hook-form";
import {BoardPreview} from "./BoardPreview";
import {BOARD_SIZE} from "../utils/constants";
import type {BingoFormValues} from "../hooks/useBingoCreateForm";

interface BingoLivePreviewProps {
  control: Control<BingoFormValues>;
  scatterMap: number[];
  hasFreeSpace: boolean;
}

export const BingoLivePreview = ({
  control,
  scatterMap,
  hasFreeSpace,
}: BingoLivePreviewProps) => {
  const entries = useWatch({control, name: "entries"});
  const filled = (entries ?? []).reduce(
    (n, e) => (e?.value?.trim() ? n + 1 : n),
    0,
  );
  const cells = new Array<string>(BOARD_SIZE).fill("");
  for (let i = 0; i < scatterMap.length; i++) {
    cells[scatterMap[i]] = entries?.[i]?.value ?? "";
  }
  return (
    <>
      <BoardPreview cells={cells} hasFreeSpace={hasFreeSpace} />
      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          mt: 1,
          color: "text.secondary",
        }}
      >
        {filled} / {scatterMap.length} spaces filled
      </Typography>
    </>
  );
};
