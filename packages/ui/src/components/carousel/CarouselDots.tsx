import {PropsWithChildren} from "react";
import Lens from "@mui/icons-material/Lens";
import TripOrigin from "@mui/icons-material/TripOrigin";
import {IconButton, IconButtonProps} from "@mui/material";

interface CarouselDotsProps extends PropsWithChildren {
  focusedItemId: string;
  itemIds: string[];
  onClickDot: (itemId: string, index: number) => void;
  color?: IconButtonProps["color"];
}

export const CarouselDots = ({
  focusedItemId,
  itemIds,
  onClickDot,
  color,
}: CarouselDotsProps) => {
  return (
    <div className="carousel-selectors">
      {itemIds.map((item, index) => (
        <IconButton
          key={item}
          size="small"
          onClick={() => onClickDot(item, index)}
          color={color}
        >
          {item === focusedItemId ? <Lens /> : <TripOrigin />}
        </IconButton>
      ))}
    </div>
  );
};
