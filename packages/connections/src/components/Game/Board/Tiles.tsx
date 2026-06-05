import {
  useConnectionsGameActions,
  useConnectionsGameState,
} from "../../../context";
import {Button} from "@mui/material";
import {COLOR_MAP} from "../../../utils";

interface TileProps {
  option: string;
  isSelected: boolean;
  shake: boolean;
  flashColor: string | null;
  onSelect: (option: string) => void;
}

const Tile = ({option, isSelected, shake, flashColor, onSelect}: TileProps) => {
  const className =
    "connections-tile" + (isSelected && shake ? " connections-tile-shake" : "");
  const style = flashColor
    ? {backgroundColor: flashColor, color: "black"}
    : undefined;
  return (
    <Button
      onClick={() => onSelect(option)}
      className={className}
      variant="contained"
      disableElevation
      color={isSelected ? "primary" : "inherit"}
      style={style}
    >
      {option}
    </Button>
  );
};

export const Tiles = () => {
  const {options, selections, shakeAnimation, flashCategory} =
    useConnectionsGameState();
  const {selectOption} = useConnectionsGameActions();

  const selectedSet = new Set(selections);
  const flashColor = flashCategory !== null ? COLOR_MAP[flashCategory] : null;

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
