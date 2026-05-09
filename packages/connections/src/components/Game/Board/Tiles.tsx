import {memo, useCallback, useMemo} from "react";
import {useConnectionsGameContext} from "../../../context";
import {Button} from "@mui/material";
import {COLOR_MAP} from "../../../utils";

interface TileProps {
  option: string;
  isSelected: boolean;
  shake: boolean;
  flashColor: string | null;
  onSelect: (option: string) => void;
}

const Tile = memo(function Tile({
  option,
  isSelected,
  shake,
  flashColor,
  onSelect,
}: TileProps) {
  const handleClick = useCallback(() => onSelect(option), [onSelect, option]);
  const className =
    "connections-tile" +
    (isSelected && shake ? " connections-tile-shake" : "");
  const style = flashColor
    ? {backgroundColor: flashColor, color: "black"}
    : undefined;
  return (
    <Button
      onClick={handleClick}
      className={className}
      variant="contained"
      disableElevation
      color={isSelected ? "primary" : "inherit"}
      style={style}
    >
      {option}
    </Button>
  );
});

export const Tiles = () => {
  const {options, selectOption, selections, shakeAnimation, flashCategory} =
    useConnectionsGameContext();

  const selectedSet = useMemo(() => new Set(selections), [selections]);
  const flashColor: string | null =
    flashCategory !== null ? COLOR_MAP[flashCategory] : null;

  return (
    <>
      {options.map((option) => {
        const isSelected = selectedSet.has(option);
        return (
          <Tile
            key={option}
            option={option}
            isSelected={isSelected}
            shake={shakeAnimation}
            flashColor={isSelected ? flashColor : null}
            onSelect={selectOption}
          />
        );
      })}
    </>
  );
};
