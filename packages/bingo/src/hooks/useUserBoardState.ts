import {
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
  ApiError,
  getBingoUserBoard,
  toggleBingoMark,
  type BingoUserBoardResponse,
} from "@bored/api";
import {FREE_SPACE_INDEX, FREE_SPACE_SENTINEL} from "../utils/constants";

export type UserBoardState =
  | {kind: "loading"}
  | {kind: "ready"; data: BingoUserBoardResponse}
  | {kind: "error"; message: string};

function toggleIndex(marks: number[], index: number): number[] {
  return marks.includes(index)
    ? marks.filter((m) => m !== index)
    : [...marks, index];
}

interface UseUserBoardStateArgs {
  boardId: string | undefined;
  userId: string | undefined;
}

export function useUserBoardState({boardId, userId}: UseUserBoardStateArgs) {
  const location = useLocation();
  const navigate = useNavigate();

  const initial = (location.state as BingoUserBoardResponse | null) ?? null;
  const initialIsFresh =
    !!initial && initial.boardId === boardId && initial.userId === userId;

  const [state, setState] = useState<UserBoardState>(
    initialIsFresh && initial
      ? {kind: "ready", data: initial}
      : {kind: "loading"},
  );
  const [marks, setMarks] = useState<number[]>(
    initialIsFresh ? (initial?.marks ?? []) : [],
  );
  const [optimisticMarks, applyOptimistic] = useOptimistic(
    marks,
    (current: number[], index: number) => toggleIndex(current, index),
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (state.kind !== "loading" || !boardId || !userId) return;
    let cancelled = false;
    void (async () => {
      try {
        const data = await getBingoUserBoard(boardId, userId);
        if (cancelled) return;
        setState({kind: "ready", data});
        setMarks(data.marks);
      } catch (err) {
        if (cancelled) return;
        if (
          err instanceof ApiError &&
          (err.status === 404 || err.status === 410)
        ) {
          navigate("/bingo/expired", {replace: true});
          return;
        }
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "Could not load board",
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [state.kind, boardId, userId, navigate]);

  const board = state.kind === "ready" ? state.data.board : undefined;
  const hasFreeSpace =
    !!board && board[FREE_SPACE_INDEX] === FREE_SPACE_SENTINEL;

  const optimisticSet = useMemo(
    () => new Set(optimisticMarks),
    [optimisticMarks],
  );

  const onCellClick = useCallback(
    (index: number) => {
      if (!boardId || !userId) return;
      if (hasFreeSpace && index === FREE_SPACE_INDEX) return;
      startTransition(async () => {
        applyOptimistic(index);
        try {
          const result = await toggleBingoMark(boardId, userId, index);
          setMarks(result.marks);
        } catch (err) {
          setState({
            kind: "error",
            message:
              err instanceof Error ? err.message : "Failed to update mark",
          });
        }
      });
    },
    [boardId, userId, hasFreeSpace, applyOptimistic],
  );

  return {state, hasFreeSpace, optimisticSet, onCellClick};
}
