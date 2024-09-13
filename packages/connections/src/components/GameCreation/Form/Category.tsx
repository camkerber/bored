import {TextField} from "@mui/material";
import {ChangeEvent, FocusEvent, useState} from "react";
import {useCreateGameFormContext} from "@bored/providers";
import {
  CategoryV2 as CategoryType,
  CreateGameFormActionType,
  GameFormField,
} from "@bored/utils";

const CATEGORY_FORM_FIELD_MAP = {
  [CategoryType.Yellow]: GameFormField.YellowName,
  [CategoryType.Green]: GameFormField.GreenName,
  [CategoryType.Blue]: GameFormField.BlueName,
  [CategoryType.Purple]: GameFormField.PurpleName,
};

interface CategoryProps {
  color: "warning" | "success" | "primary" | "secondary";
  category: CategoryType;
}

const Category = ({color, category}: CategoryProps) => {
  const {newGame, updateGameForm, setFormFieldValid} =
    useCreateGameFormContext();
  const [error, setError] = useState<string | null>(null);

  const categoryNameFieldValue = newGame.connections.find(
    (connection) => connection.category === category,
  )?.description;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const proposedCategoryName = event.target.value;

    if (proposedCategoryName.length > 40) {
      setError("Category names must be 40 characters or less");
      setFormFieldValid(false, CATEGORY_FORM_FIELD_MAP[category]);
    } else {
      setError(null);
    }

    updateGameForm({
      type: CreateGameFormActionType.ChangeCategoryName,
      payload: {
        newCategoryName: {
          category,
          newName: proposedCategoryName,
        },
      },
    });
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const proposedCategoryName = event.target.value;

    if (proposedCategoryName.trim().length === 0) {
      setError("Category name is required");
      setFormFieldValid(false, CATEGORY_FORM_FIELD_MAP[category]);
      return;
    }

    if (proposedCategoryName.length > 40) {
      setError("Category names must be 40 characters or less");
      setFormFieldValid(false, CATEGORY_FORM_FIELD_MAP[category]);
      return;
    } else {
      setError(null);
    }

    let hasDuplicates = false;
    newGame.connections.forEach((connection) => {
      if (
        connection.category !== category &&
        connection.description === proposedCategoryName
      ) {
        hasDuplicates = true;
      }
    });
    if (hasDuplicates) {
      setError("All category names must be unique");
      setFormFieldValid(false, CATEGORY_FORM_FIELD_MAP[category]);
      return;
    } else {
      setError(null);
    }

    updateGameForm({
      type: CreateGameFormActionType.ChangeCategoryName,
      payload: {
        newCategoryName: {
          category,
          newName: proposedCategoryName,
        },
      },
    });
    setFormFieldValid(true, CATEGORY_FORM_FIELD_MAP[category]);
  };

  return (
    <TextField
      label="Category name"
      variant="outlined"
      color={color}
      fullWidth
      value={categoryNameFieldValue}
      onChange={handleChange}
      inputProps={{maxLength: 40}}
      onBlur={handleBlur}
      error={!!error}
      helperText={error}
    />
  );
};

export default Category;
