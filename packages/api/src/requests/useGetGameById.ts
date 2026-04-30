import {Game} from "@bored/utils";
import {useApiQuery} from "./useApiQuery";

export const useGetGameById = (gameId: string) =>
  useApiQuery<Game>(`/api/game/${encodeURIComponent(gameId)}`);
