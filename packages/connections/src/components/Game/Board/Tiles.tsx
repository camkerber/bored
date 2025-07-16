import {useConnectionsGameContext} from "@bored/providers";
import {Button} from "@mui/material";

export const Tiles = () => {
  const {options, selectOption, selections} = useConnectionsGameContext();

  return (
    <>
      {options.map((option) => {
        const isSelected = selections.includes(option);
        return (
          <Button
            key={option}
            onClick={() => selectOption(option)}
            className="connections-tile"
            variant="contained"
            disableElevation
            color={isSelected ? "primary" : "inherit"}
          >
            {option}
          </Button>
        );
      })}
    </>
  );
};
