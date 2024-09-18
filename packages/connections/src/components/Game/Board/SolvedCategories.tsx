import {useColorModeContext, useConnectionsGameContext} from "@bored/providers";
import {CategoryV2} from "@bored/utils";
import {Paper, Typography, Grid} from "@mui/material";
import {COLOR_MAP} from "../../../utils";

export const SolvedCategories = () => {
  const {solvedCategories, activeGame} = useConnectionsGameContext();
  const colorMode = useColorModeContext();

  const getConnection = (category: CategoryV2) =>
    activeGame.connections.find(
      (connection) => connection.category === category,
    );

  const joinAllOptions = (category: CategoryV2) => {
    const connection = getConnection(category);
    const names = connection?.options.map((option) => option) ?? [];
    return names.join(", ").toUpperCase();
  };

  return (
    <>
      {solvedCategories.map((category) => {
        return (
          <Grid key={category} item xs={12}>
            <Paper
              sx={{backgroundColor: COLOR_MAP[colorMode.mode][category]}}
              className="connections-revealed-category"
            >
              <Typography variant="h6" sx={{textAlign: "center"}}>
                {getConnection(category)?.description?.toUpperCase()}
              </Typography>
              <Typography variant="body2">
                {joinAllOptions(category)}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};
