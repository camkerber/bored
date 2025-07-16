import {Grid2, Paper} from "@mui/material";
import {CategoryV2 as CategoryType} from "@bored/utils";
import {Category} from "./Category";
import {Options} from "./Options";
import {COLOR_MAP, TEXT_FIELD_COLORS} from "../../../utils";

interface ConnectionProps {
  category: CategoryType;
}

export const Connection = ({category}: ConnectionProps) => {
  return (
    <Grid2 size={12}>
      <Paper
        sx={{
          p: 2,
          border: "3px solid",
          borderColor: COLOR_MAP[category],
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
    </Grid2>
  );
};
