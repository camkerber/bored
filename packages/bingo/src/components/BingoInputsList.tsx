import {Checkbox, FormControlLabel, Stack} from "@mui/material";
import type {Control, UseFormRegister} from "react-hook-form";
import {BingoSpaceField} from "./BingoSpaceField";
import type {BingoFormValues} from "../hooks/useBingoCreateForm";

interface BingoInputsListProps {
  control: Control<BingoFormValues>;
  register: UseFormRegister<BingoFormValues>;
  totalNeeded: number;
  hasFreeSpace: boolean;
  checkboxLocked: boolean;
  onToggleFreeSpace: (next: boolean) => void;
}

export const BingoInputsList = ({
  control,
  register,
  totalNeeded,
  hasFreeSpace,
  checkboxLocked,
  onToggleFreeSpace,
}: BingoInputsListProps) => (
  <Stack spacing={1.25} sx={{width: "100%"}}>
    <FormControlLabel
      control={
        <Checkbox
          checked={hasFreeSpace}
          disabled={checkboxLocked}
          onChange={(e) => onToggleFreeSpace(e.target.checked)}
        />
      }
      label="Free space"
    />
    {Array.from({length: totalNeeded}, (_, index) => (
      <BingoSpaceField
        key={`${hasFreeSpace ? "f" : "n"}-${index}`}
        control={control}
        register={register}
        index={index}
      />
    ))}
  </Stack>
);
