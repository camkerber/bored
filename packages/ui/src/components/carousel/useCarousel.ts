import {useDebounce} from "@bored/utils";
import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface CarouselArgs {
  defaultFocusedItemId: string;
  itemIds: string[];
}

interface CarouselReturn {
  containerRef: RefObject<HTMLDivElement>;
  itemRefs: MutableRefObject<HTMLDivElement[]>;
  focusedItemId: string;
  handleDotClick: (itemId: string, itemIndex: number) => void;
}

export const useCarousel = ({
  defaultFocusedItemId,
  itemIds,
}: CarouselArgs): CarouselReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  const [focusedItemId, setFocusedItemId] = useState(defaultFocusedItemId);
  const debouncedSetFocusedItemId = useDebounce(
    (value: string) => setFocusedItemId(value),
    50,
  );

  const handleDotClick = (itemId: string, itemIndex: number) => {
    setFocusedItemId(itemId);
    itemRefs.current[itemIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const centerPosition = scrollLeft + containerWidth / 2;
      const offsetLeft = container.offsetLeft;

      itemRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          const itemLeft = cardRef.offsetLeft - offsetLeft;
          const itemWidth = cardRef.offsetWidth;

          if (
            itemLeft < centerPosition &&
            itemLeft + itemWidth > centerPosition
          ) {
            const centerItem = itemIds[index];
            debouncedSetFocusedItemId(centerItem);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIds]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      container.addEventListener("touchmove", handleScroll); // mobile

      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("touchmove", handleScroll);
      };
    }
  }, [handleScroll]);

  return {containerRef, itemRefs, focusedItemId, handleDotClick};
};
