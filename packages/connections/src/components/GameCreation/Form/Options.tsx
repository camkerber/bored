import {TextField} from "@mui/material";
import {ChangeEvent, FocusEvent, useState} from "react";
import {useCreateGameFormContext} from "@bored/providers";
import {CategoryV2, CreateGameFormActionType} from "@bored/utils";
import {CATEGORY_FORM_FIELD_OPTIONS_MAP} from "../../../utils";

interface OptionsProps {
  color: "warning" | "success" | "primary" | "secondary";
  category: CategoryV2;
}

const Options = ({color, category}: OptionsProps) => {
  const [error, setError] = useState<string | null>(null);
  const [localOptions, setLocalOptions] = useState<string>("");
  const {newGame, updateGameForm, setFormFieldValid} =
    useCreateGameFormContext();

  const validateAndUpdate = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputValue = event.target.value;
    if (inputValue.trim() === "") {
      setError("Required");
      updateGameForm({
        type: CreateGameFormActionType.ChangeCategoryOptions,
        payload: {
          newCategoryOptions: {
            category,
            newOptions: [],
          },
        },
      });
      return;
    }
    const splitOptions = inputValue.split(",").map((option) => option.trim());

    // only 4 options
    if (splitOptions.length > 4) {
      setError("You can only have 4 options in each category");
      return;
    } else if (splitOptions.length < 4) {
      setError("Each category requires 4 options");
      updateGameForm({
        type: CreateGameFormActionType.ChangeCategoryOptions,
        payload: {
          newCategoryOptions: {
            category,
            newOptions: splitOptions,
          },
        },
      });
      return;
    } else {
      setError(null);
    }

    // no duplicates in own category
    if (new Set(splitOptions).size !== 4) {
      setError("All options must be unique");
      updateGameForm({
        type: CreateGameFormActionType.ChangeCategoryOptions,
        payload: {
          newCategoryOptions: {
            category,
            newOptions: splitOptions,
          },
        },
      });
      return;
    } else {
      setError(null);
    }

    // no duplicates in other categories
    let hasDuplicates = false;
    newGame.connections.forEach((connection) => {
      splitOptions.forEach((newOption) => {
        if (
          connection.category !== category &&
          connection.options.includes(newOption)
        ) {
          hasDuplicates = true;
        }
      });
    });
    if (hasDuplicates) {
      setError("All options must be unique");
      updateGameForm({
        type: CreateGameFormActionType.ChangeCategoryOptions,
        payload: {
          newCategoryOptions: {
            category,
            newOptions: splitOptions,
          },
        },
      });
      return;
    } else {
      setError(null);
    }

    // update categoryOptions state
    updateGameForm({
      type: CreateGameFormActionType.ChangeCategoryOptions,
      payload: {
        newCategoryOptions: {
          category,
          newOptions: splitOptions,
        },
      },
    });
    setFormFieldValid(true, CATEGORY_FORM_FIELD_OPTIONS_MAP[category]);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const proposedOptionsAsString = event.target.value;
    setLocalOptions(proposedOptionsAsString);
  };

  return (
    <>
      <TextField
        label="Options"
        helperText={error ?? "Enter values separated by commas"}
        variant="outlined"
        color={color}
        fullWidth
        value={localOptions}
        onChange={handleChange}
        onBlur={(e) => validateAndUpdate(e)}
        error={!!error}
        inputProps={{maxLength: 56}}
      />
    </>
  );
};

export default Options;
