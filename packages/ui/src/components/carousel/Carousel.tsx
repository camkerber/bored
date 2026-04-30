import {PropsWithChildren, RefObject} from "react";
import {CarouselDots} from "./CarouselDots";
import {IconButtonProps} from "@mui/material";

interface CarouselProps extends PropsWithChildren {
  containerRef: RefObject<HTMLDivElement | null>;
  focusedItemId: string;
  itemIds: string[];
  onClickDot: (itemId: string, index: number) => void;
  dotsColor?: IconButtonProps["color"];
}

export const Carousel = ({
  containerRef,
  focusedItemId,
  itemIds,
  onClickDot,
  dotsColor,
  children,
}: CarouselProps) => {
  return (
    <>
      <div className="carousel-container" ref={containerRef}>
        {children}
      </div>
      <CarouselDots
        focusedItemId={focusedItemId}
        itemIds={itemIds}
        onClickDot={onClickDot}
        color={dotsColor}
      />
    </>
  );
};
