import {Grid2, TextField} from "@mui/material";
import {ChangeEvent, FocusEvent, useEffect, useState} from "react";
import {useCreateGameFormContext} from "@bored/providers";
import {CreateGameFormActionType, GameFormField} from "@bored/utils";

export const Title = () => {
  const {newGame, updateGameForm, setFormFieldValid, formResetSignal} =
    useCreateGameFormContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formResetSignal === "reset") {
      setError(null);
    }
  }, [formResetSignal]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const proposedTitle = event.target.value;

    if (proposedTitle.length > 50) {
      setError("Game name must be 50 characters or less");
      setFormFieldValid(false, GameFormField.Title);
    } else {
      setError(null);
    }

    updateGameForm({
      type: CreateGameFormActionType.ChangeTitle,
      payload: {
        newTitle: proposedTitle,
      },
    });
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const proposedTitle = event.target.value;
    if (proposedTitle.trim().length === 0) {
      setError("Game name is required");
      setFormFieldValid(false, GameFormField.Title);
      return;
    }

    if (proposedTitle.length > 50) {
      setError("Game name must be 50 characters or less");
      setFormFieldValid(false, GameFormField.Title);
    } else {
      setError(null);
    }

    updateGameForm({
      type: CreateGameFormActionType.ChangeTitle,
      payload: {
        newTitle: proposedTitle,
      },
    });
    setFormFieldValid(true, GameFormField.Title);
  };

  return (
    <Grid2 size={12}>
      <TextField
        id="game-name"
        variant="outlined"
        label="Game name"
        fullWidth
        onChange={handleChange}
        value={newGame.title}
        inputProps={{maxLength: 50}}
        error={!!error}
        helperText={error}
        onBlur={handleBlur}
      />
    </Grid2>
  );
};
