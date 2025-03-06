import {PropsWithChildren} from "react";
import Lens from "@mui/icons-material/Lens";
import TripOrigin from "@mui/icons-material/TripOrigin";
import {IconButton} from "@mui/material";

interface CarouselDotsProps extends PropsWithChildren {
  focusedItemId: string;
  itemIds: string[];
  onClickDot: (itemId: string, index: number) => void;
}

export const CarouselDots = ({
  focusedItemId,
  itemIds,
  onClickDot,
}: CarouselDotsProps) => {
  return (
    <div className="carousel-selectors">
      {itemIds.map((item, index) => (
        <IconButton
          key={item}
          size="small"
          onClick={() => onClickDot(item, index)}
        >
          {item === focusedItemId ? <Lens /> : <TripOrigin />}
        </IconButton>
      ))}
    </div>
  );
};
