import {Button, Stack, TextField} from "@mui/material";
import type {ReactNode} from "react";

export interface ControlInput {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
  width?: number;
  onEnter?: () => void;
}

export interface ControlAction {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  variant?: "contained" | "outlined";
  color?: "primary" | "error";
  disabled?: boolean;
}

interface Props {
  inputs: ControlInput[];
  actions: ControlAction[];
}

export const DsaControlBar = ({inputs, actions}: Props) => (
  <Stack
    direction="row"
    sx={{mt: 2, flexWrap: "wrap", alignItems: "center", gap: 1}}
  >
    {inputs.map((field) => (
      <TextField
        key={field.label}
        size="small"
        label={field.label}
        type={field.type ?? "number"}
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        onKeyDown={
          field.onEnter
            ? (e) => {
                if (e.key === "Enter") field.onEnter?.();
              }
            : undefined
        }
        sx={{width: field.width ?? 120}}
      />
    ))}
    {actions.map((action) => (
      <Button
        key={action.label}
        variant={action.variant ?? "outlined"}
        color={action.color ?? "primary"}
        startIcon={action.icon}
        onClick={action.onClick}
        disabled={action.disabled}
      >
        {action.label}
      </Button>
    ))}
  </Stack>
);
