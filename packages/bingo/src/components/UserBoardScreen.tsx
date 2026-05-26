import {Alert} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import type {BingoUserBoardResponse} from "@bored/api";
import {useUserBoardMarks} from "../hooks/useUserBoardState";
import {useShareBingoBoard} from "../hooks/useShareBingoBoard";
import {FREE_SPACE_INDEX, FREE_SPACE_SENTINEL} from "../utils/constants";
import {InteractiveBoardView} from "./InteractiveBoardView";

export const UserBoardScreen = () => {
  const data = useLoaderData() as BingoUserBoardResponse;
  const hasFreeSpace = data.board[FREE_SPACE_INDEX] === FREE_SPACE_SENTINEL;
  const {marks, onCellClick, error} = useUserBoardMarks({
    boardId: data.boardId,
    userId: data.userId,
    initialMarks: data.marks,
    hasFreeSpace,
  });
  const {onShare, shareNote} = useShareBingoBoard(data.boardId);

  return (
    <>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <InteractiveBoardView
        cells={data.board}
        marks={marks}
        hasFreeSpace={hasFreeSpace}
        onCellClick={onCellClick}
        onShare={onShare}
        shareNote={shareNote}
      />
    </>
  );
};
