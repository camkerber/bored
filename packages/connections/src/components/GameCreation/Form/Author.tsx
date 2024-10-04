import {Grid, TextField} from "@mui/material";
import {ChangeEvent, FocusEvent, useEffect, useState} from "react";
import {useCreateGameFormContext} from "@bored/providers";
import {CreateGameFormActionType, GameFormField} from "@bored/utils";

const Author = () => {
  const {newGame, updateGameForm, setFormFieldValid, formResetSignal} =
    useCreateGameFormContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formResetSignal === "reset") {
      setError(null);
    }
  }, [formResetSignal]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const proposedAuthor = event.target.value;

    if (proposedAuthor.length > 50) {
      setError("Game name must be 50 characters or less");
      setFormFieldValid(false, GameFormField.Author);
    } else {
      setError(null);
    }

    updateGameForm({
      type: CreateGameFormActionType.ChangeAuthor,
      payload: {
        newAuthor: proposedAuthor,
      },
    });
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const proposedAuthor = event.target.value;
    // if (proposedAuthor.trim().length === 0) {
    //   setError("Author is required");
    //   setFormFieldValid(false, GameFormField.Author);
    //   return;
    // }

    if (proposedAuthor.length > 50) {
      setError("Author must be 50 characters or less");
      setFormFieldValid(false, GameFormField.Author);
    } else {
      setError(null);
    }

    updateGameForm({
      type: CreateGameFormActionType.ChangeAuthor,
      payload: {
        newAuthor: proposedAuthor,
      },
    });
    setFormFieldValid(true, GameFormField.Author);
  };

  return (
    <Grid item xs={12}>
      <TextField
        id="game-author"
        variant="outlined"
        label="Author"
        fullWidth
        onChange={handleChange}
        value={newGame.author}
        inputProps={{maxLength: 50}}
        error={!!error}
        helperText={error}
        onBlur={handleBlur}
      />
    </Grid>
  );
};

export default Author;
