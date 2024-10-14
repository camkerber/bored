import {useConnectionsGameContext} from "@bored/providers";
import {Button, Grid2} from "@mui/material";

export const Tiles = () => {
  const {options, selectOption, selections} = useConnectionsGameContext();

  return (
    <>
      {options.map((option) => {
        const isSelected = selections.includes(option);
        return (
          <Grid2 key={option} size={3}>
            <Button
              onClick={() => selectOption(option)}
              className="connections-tile"
              variant="contained"
              disableElevation
              color={isSelected ? "primary" : "inherit"}
            >
              {option}
            </Button>
          </Grid2>
        );
      })}
    </>
  );
};
