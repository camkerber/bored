import {redirect, type LoaderFunctionArgs} from "react-router-dom";
import {
  ApiError,
  getBingoUserBoard,
  mintBingoUserBoard,
  type BingoUserBoardResponse,
} from "@bored/api";

export async function bingoMintLoader({params}: LoaderFunctionArgs) {
  const {boardId} = params;
  if (!boardId) return redirect("/bingo/expired");
  try {
    const result = await mintBingoUserBoard(boardId);
    return redirect(`/bingo/${result.boardId}/user/${result.userId}`);
  } catch {
    return redirect("/bingo/expired");
  }
}

export async function bingoUserBoardLoader({
  params,
}: LoaderFunctionArgs): Promise<BingoUserBoardResponse | Response> {
  const {boardId, userId} = params;
  if (!boardId || !userId) return redirect("/bingo/expired");
  try {
    return await getBingoUserBoard(boardId, userId);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 410)) {
      return redirect("/bingo/expired");
    }
    throw err;
  }
}
