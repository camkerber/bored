import {Checkbox, FormControlLabel, Stack, TextField} from "@mui/material";
import type {FieldErrors, UseFormRegister} from "react-hook-form";
import {MAX_SPACE_LENGTH} from "../utils/constants";
import type {BingoFormValues} from "../hooks/useBingoCreateForm";

interface BingoInputsListProps {
  register: UseFormRegister<BingoFormValues>;
  errors: FieldErrors<BingoFormValues>;
  totalNeeded: number;
  hasFreeSpace: boolean;
  checkboxLocked: boolean;
  onToggleFreeSpace: (next: boolean) => void;
}

export const BingoInputsList = ({
  register,
  errors,
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
      <TextField
        key={`${hasFreeSpace ? "f" : "n"}-${index}`}
        label={`Space ${index + 1}`}
        size="small"
        fullWidth
        slotProps={{htmlInput: {maxLength: MAX_SPACE_LENGTH}}}
        {...register(`entries.${index}.value`, {
          required: true,
          validate: (v) => v.trim().length > 0,
          maxLength: MAX_SPACE_LENGTH,
        })}
        error={!!errors.entries?.[index]?.value}
      />
    ))}
  </Stack>
);
