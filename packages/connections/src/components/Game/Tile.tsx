import {Button, Grid} from "@mui/material";
import {useConnectionsGameContext} from "@bored/providers";
import "@bored/styles";

interface TileProps {
  option: string;
}

const Tile = ({option}: TileProps) => {
  const {selectOption, selections} = useConnectionsGameContext();

  const isSelected = selections.includes(option);

  return (
    <Grid item xs={3}>
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
};

export default Tile;
