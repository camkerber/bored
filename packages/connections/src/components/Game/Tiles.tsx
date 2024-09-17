import {useConnectionsGameContext} from "@bored/providers";
import {Button, Grid} from "@mui/material";

const Tiles = () => {
  const {options, selectOption, selections} = useConnectionsGameContext();

  return (
    <>
      {options.map((option) => {
        const isSelected = selections.includes(option);
        return (
          <Grid key={option} item xs={3}>
            <Button
              onClick={() => selectOption(option)}
              className="connections-tile"
              variant="contained"
              disableElevation
              color={isSelected ? "primary" : "inherit"}
            >
              {option}
            </Button>
          </Grid>
        );
      })}
    </>
  );
};

export default Tiles;
