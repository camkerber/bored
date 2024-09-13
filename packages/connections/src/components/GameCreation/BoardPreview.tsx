import {Button, Grid, useMediaQuery, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {useCreateGameFormContext} from "@bored/providers";
import "@bored/styles";
import {CategoryV2} from "@bored/utils";

const GRID_SIZE = 16;

type OptionPositionMap = {
  [key in CategoryV2]: Record<number, number>;
};

const OPTION_POSITION_MAP: OptionPositionMap = {
  [CategoryV2.Yellow]: {
    0: 1,
    1: 4,
    2: 10,
    3: 12,
  },
  [CategoryV2.Green]: {
    0: 0,
    1: 3,
    2: 9,
    3: 11,
  },
  [CategoryV2.Blue]: {
    0: 2,
    1: 5,
    2: 8,
    3: 14,
  },
  [CategoryV2.Purple]: {
    0: 15,
    1: 6,
    2: 7,
    3: 13,
  },
};

const BoardPreview = () => {
  const {newGame} = useCreateGameFormContext();
  const [optionsAsGrid, setOptionsAsGrid] = useState<(string | number)[]>(
    () => Array(GRID_SIZE).fill(0) as (string | number)[],
  );

  const theme = useTheme();
  const largerScreen = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    const newOptions = Array(GRID_SIZE).fill(0) as (string | number)[];
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
