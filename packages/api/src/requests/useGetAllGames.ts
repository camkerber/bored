import {Game} from "@bored/utils";
import {useApiQuery} from "./useApiQuery";

export const useGetAllGames = () => useApiQuery<Game[]>("/api/games");
