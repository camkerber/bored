import {useParams} from "react-router-dom";
import {useUserBoardState} from "../hooks/useUserBoardState";
import {useShareBingoBoard} from "../hooks/useShareBingoBoard";
import {BoardLoadingState} from "./BoardLoadingState";
import {BoardErrorState} from "./BoardErrorState";
import {InteractiveBoardView} from "./InteractiveBoardView";

interface RouteParams extends Record<string, string | undefined> {
  boardId: string;
  userId: string;
}

export const UserBoardScreen = () => {
  const {boardId, userId} = useParams<RouteParams>();
  const {state, hasFreeSpace, optimisticSet, onCellClick} = useUserBoardState({
    boardId,
    userId,
  });
  const {onShare, shareNote} = useShareBingoBoard(boardId);

  if (state.kind === "loading") return <BoardLoadingState />;
  if (state.kind === "error") return <BoardErrorState message={state.message} />;

  return (
    <InteractiveBoardView
      cells={state.data.board}
      marks={optimisticSet}
      hasFreeSpace={hasFreeSpace}
      onCellClick={onCellClick}
      onShare={onShare}
      shareNote={shareNote}
    />
  );
};
