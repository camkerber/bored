import {Button, Grid, useMediaQuery, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {useCreateGameFormContext} from "@bored/providers";
import "@bored/styles";
import {OPTION_POSITION_MAP, PREVIEW_GRID_SIZE} from "../../utils";

const BoardPreview = () => {
  const {newGame} = useCreateGameFormContext();
  const [optionsAsGrid, setOptionsAsGrid] = useState<(string | number)[]>(
    () => Array(PREVIEW_GRID_SIZE).fill(0) as (string | number)[],
  );

  const theme = useTheme();
  const largerScreen = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    const newOptions = Array(PREVIEW_GRID_SIZE).fill(0) as (string | number)[];
    newGame.connections.forEach((connection) => {
      connection.options.forEach((option, index) => {
        newOptions[OPTION_POSITION_MAP[connection.category][index]] = option;
      });
    });
    setOptionsAsGrid(newOptions);
  }, [newGame.connections]);

  return (
    <Grid
      item
      xs={largerScreen ? 6 : 12}
      mt={largerScreen ? 3 : 0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container mt={largerScreen ? 1 : 0} mb={4} spacing={1}>
        {optionsAsGrid.map((option) => {
          return (
            <Grid key={Math.random()} item xs={3}>
              <Button disabled variant="contained" className="connections-tile">
                {typeof option === "number" ? "" : option}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default BoardPreview;
