import {Grid, Paper, Typography} from "@mui/material";
import {useColorModeContext, useConnectionsGameContext} from "@bored/providers";
import "@bored/styles";
import {CategoryV2, COLOR_MAP} from "@bored/utils";

interface SolvedCategoryProps {
  category: CategoryV2;
}

const SolvedCategory = ({category}: SolvedCategoryProps) => {
  const colorMode = useColorModeContext();
  const {activeGame} = useConnectionsGameContext();
  const connection = activeGame.connections.find(
    (connection) => connection.category === category,
  );

  const joinAllOptions = () => {
    const names = connection?.options.map((option) => option) ?? [];
    return names.join(", ").toUpperCase();
  };

  return (
    <Grid item xs={12}>
      <Paper
        sx={{backgroundColor: COLOR_MAP[colorMode.mode][category]}}
        className="connections-revealed-category"
      >
        <Typography variant="h6" sx={{textAlign: "center"}}>
          {connection?.description?.toUpperCase()}
        </Typography>
        <Typography variant="body2">{joinAllOptions()}</Typography>
      </Paper>
    </Grid>
  );
};

export default SolvedCategory;
