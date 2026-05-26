import {useOptimistic, useState, useTransition} from "react";
import {toggleBingoMark} from "@bored/api";
import {FREE_SPACE_INDEX} from "../utils/constants";

function toggleMark(marks: ReadonlySet<number>, index: number): Set<number> {
  const next = new Set(marks);
  if (next.has(index)) next.delete(index);
  else next.add(index);
  return next;
}

interface UseUserBoardMarksArgs {
  boardId: string;
  userId: string;
  initialMarks: number[];
  hasFreeSpace: boolean;
}

export function useUserBoardMarks({
  boardId,
  userId,
  initialMarks,
  hasFreeSpace,
}: UseUserBoardMarksArgs) {
  const [marks, setMarks] = useState<ReadonlySet<number>>(
    () => new Set(initialMarks),
  );
  const [optimisticMarks, applyOptimistic] = useOptimistic(
    marks,
    (current: ReadonlySet<number>, index: number) => toggleMark(current, index),
  );
  const [, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onCellClick = (index: number) => {
    if (hasFreeSpace && index === FREE_SPACE_INDEX) return;
    startTransition(async () => {
      applyOptimistic(index);
      try {
        const result = await toggleBingoMark(boardId, userId, index);
        setMarks(new Set(result.marks));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update mark");
      }
    });
  };

  return {marks: optimisticMarks, onCellClick, error};
}
