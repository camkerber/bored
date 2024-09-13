import {Grid, Paper} from "@mui/material";
import {useColorModeContext} from "@bored/providers";
import {COLOR_MAP, CategoryV2 as CategoryType} from "@bored/utils";
import Category from "./Category";
import Options from "./Options";

const TEXT_FIELD_COLORS: Record<
  CategoryType,
  "warning" | "success" | "primary" | "secondary"
> = {
  [CategoryType.Yellow]: "warning",
  [CategoryType.Green]: "success",
  [CategoryType.Blue]: "primary",
  [CategoryType.Purple]: "secondary",
};

interface ConnectionProps {
  category: CategoryType;
}

const Connection = ({category}: ConnectionProps) => {
  const {mode} = useColorModeContext();

  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 2,
          border: "3px solid",
          borderColor: COLOR_MAP[mode][category],
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
        }}
        elevation={0}
      >
        <Category color={TEXT_FIELD_COLORS[category]} category={category} />
        <Options color={TEXT_FIELD_COLORS[category]} category={category} />
      </Paper>
    </Grid>
  );
};

export default Connection;
