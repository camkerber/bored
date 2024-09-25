import {Grid} from "@mui/material";
import "@bored/styles";
import {SolvedCategories} from "./SolvedCategories";
import {Tiles} from "./Tiles";

export const Board = () => {
  return (
    <div>
      <Grid container spacing={1} className="connections-game-board">
        <SolvedCategories />
        <Tiles />
      </Grid>
    </div>
  );
};
