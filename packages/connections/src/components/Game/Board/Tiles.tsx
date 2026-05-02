import {memo, useCallback, useMemo} from "react";
import {useConnectionsGameContext} from "../../../context";
import {Button} from "@mui/material";

interface TileProps {
  option: string;
  isSelected: boolean;
  onSelect: (option: string) => void;
}

const Tile = memo(function Tile({option, isSelected, onSelect}: TileProps) {
  const handleClick = useCallback(() => onSelect(option), [onSelect, option]);
  return (
    <Button
      onClick={handleClick}
      className="connections-tile"
      variant="contained"
      disableElevation
      color={isSelected ? "primary" : "inherit"}
    >
      {option}
    </Button>
  );
});

export const Tiles = () => {
  const {options, selectOption, selections} = useConnectionsGameContext();

  const selectedSet = useMemo(() => new Set(selections), [selections]);

  return (
    <>
      {options.map((option) => (
        <Tile
          key={option}
          option={option}
          isSelected={selectedSet.has(option)}
          onSelect={selectOption}
        />
      ))}
    </>
  );
};
