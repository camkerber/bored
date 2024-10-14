import {Grid2} from "@mui/material";
import {SolvedCategories} from "./SolvedCategories";
import {Tiles} from "./Tiles";

export const Board = () => {
  return (
    <div>
      <Grid2 container spacing={1} className="connections-game-board">
        <SolvedCategories />
        <Tiles />
      </Grid2>
    </div>
  );
};
