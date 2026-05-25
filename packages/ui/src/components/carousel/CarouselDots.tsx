import {Fragment, PropsWithChildren} from "react";
import Lens from "@mui/icons-material/Lens";
import TripOrigin from "@mui/icons-material/TripOrigin";
import {IconButton, IconButtonProps, Tooltip} from "@mui/material";

interface CarouselDotsProps extends PropsWithChildren {
  focusedItemId: string;
  itemIds: string[];
  onClickDot: (itemId: string, index: number) => void;
  color?: IconButtonProps["color"];
  tooltipLabels?: Record<string, string>;
}

export const CarouselDots = ({
  focusedItemId,
  itemIds,
  onClickDot,
  color,
  tooltipLabels,
}: CarouselDotsProps) => {
  return (
    <div className="carousel-selectors">
      {itemIds.map((item, index) => {
        const label = tooltipLabels?.[item];
        const button = (
          <IconButton
            size="small"
            onClick={() => onClickDot(item, index)}
            color={color}
          >
            {item === focusedItemId ? <Lens /> : <TripOrigin />}
          </IconButton>
        );

        return (
          <Fragment key={item}>
            {label ? (
              <Tooltip title={label} placement="bottom">
                {button}
              </Tooltip>
            ) : (
              button
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
