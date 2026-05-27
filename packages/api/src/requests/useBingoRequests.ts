import {apiGet, apiPost, apiPut} from "../apiClient";

export interface BingoUserBoardResponse {
  boardId: string;
  userId: string;
  board: string[];
  marks: number[];
  name?: string;
}

export const createBingoBoard = (bingoBoard: string[], name?: string) =>
  apiPost<BingoUserBoardResponse>("/api/bingo", {
    bingoBoard,
    ...(name ? {name} : {}),
  });

export const mintBingoUserBoard = (boardId: string) =>
  apiGet<BingoUserBoardResponse>(`/api/bingo/${encodeURIComponent(boardId)}`);

export const getBingoUserBoard = (boardId: string, userId: string) =>
  apiGet<BingoUserBoardResponse>(
    `/api/bingo/${encodeURIComponent(boardId)}/user/${encodeURIComponent(userId)}`,
  );

export const toggleBingoMark = (
  boardId: string,
  userId: string,
  index: number,
) =>
  apiPut<{marks: number[]}, Record<string, never>>(
    `/api/bingo/${encodeURIComponent(boardId)}/user/${encodeURIComponent(userId)}/mark/${index}`,
    {},
  );
