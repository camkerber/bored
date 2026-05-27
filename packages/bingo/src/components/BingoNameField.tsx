import {useRef, useState} from "react";
import {Box, IconButton, TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type {UseFormRegister} from "react-hook-form";
import {MAX_NAME_LENGTH} from "../utils/constants";
import type {BingoFormValues} from "../hooks/useBingoCreateForm";

interface BingoNameFieldProps {
  register: UseFormRegister<BingoFormValues>;
}

export const BingoNameField = ({register}: BingoNameFieldProps) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {ref: rhfRef, ...rhfRest} = register("name", {
    maxLength: MAX_NAME_LENGTH,
  });

  const setInputRef = (el: HTMLInputElement | null) => {
    inputRef.current = el;
    rhfRef(el);
  };

  const focusInput = () => {
    setHasInteracted(true);
    inputRef.current?.focus();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder={hasInteracted ? "Enter a name" : "Create a bingo board"}
        onFocus={() => setHasInteracted(true)}
        inputRef={setInputRef}
        {...rhfRest}
        slotProps={{
          htmlInput: {
            maxLength: MAX_NAME_LENGTH,
            "aria-label": "Bingo board name",
            style: {textAlign: "center"},
          },
        }}
        sx={{
          width: "min(100%, 520px)",
          "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-input": {
              fontSize: (theme) => theme.typography.h4.fontSize,
              fontWeight: (theme) => theme.typography.h4.fontWeight,
              lineHeight: (theme) => theme.typography.h4.lineHeight,
              padding: "8px 14px",
              "&::placeholder": {
                opacity: 1,
                color: "text.primary",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
              borderWidth: 2,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "divider",
              borderWidth: 2,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
              borderWidth: 2,
            },
          },
        }}
      />
      <IconButton
        aria-label="Edit board name"
        size="small"
        onClick={focusInput}
        color="secondary"
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
