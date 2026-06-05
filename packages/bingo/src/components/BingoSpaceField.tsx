import {TextField} from "@mui/material";
import {
  useFormState,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import {MAX_SPACE_LENGTH} from "../utils/constants";
import type {BingoFormValues} from "../hooks/useBingoCreateForm";

interface BingoSpaceFieldProps {
  control: Control<BingoFormValues>;
  register: UseFormRegister<BingoFormValues>;
  index: number;
}

export const BingoSpaceField = ({
  control,
  register,
  index,
}: BingoSpaceFieldProps) => {
  const name = `entries.${index}.value` as const;
  const {errors} = useFormState({control, name});
  const hasError = !!errors.entries?.[index]?.value;

  return (
    <TextField
      label={`Space ${index + 1}`}
      size="small"
      fullWidth
      slotProps={{htmlInput: {maxLength: MAX_SPACE_LENGTH}}}
      {...register(name, {
        required: true,
        validate: (v) => v.trim().length > 0,
        maxLength: MAX_SPACE_LENGTH,
      })}
      error={hasError}
    />
  );
};
