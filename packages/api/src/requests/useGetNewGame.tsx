import {child, get} from "firebase/database";
import {useCallback, useState} from "react";
import {useFirebaseContext} from "@bored/providers";
import {
  clearCompletedGames,
  getCompletedGames,
  getRandomArrayItem,
} from "@bored/utils";

export const useGetNewGame = () => {
  const {camnectionsV2Ref} = useFirebaseContext();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getNewGame = useCallback(
    async (currentGameId: string): Promise<string | undefined> => {
      setLoading(true);
      setError(null);
      try {
        // get all game IDs
        // TODO: paginate this API
        const idsSnapshot = await get(child(camnectionsV2Ref, "/gameIds"));
        let newGameId = "";
        if (idsSnapshot.exists()) {
          const allGameIds = idsSnapshot.val() as string[];
          let loopCount = 0;
          do {
            newGameId = getRandomArrayItem(allGameIds);
            loopCount++;
            if (loopCount > allGameIds.length) {
              clearCompletedGames();
              break;
            }
          } while (
            newGameId === currentGameId ||
            getCompletedGames().includes(newGameId)
          );
          return newGameId;
        } else {
          throw new Error("Could not find any games. Please try again.");
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [camnectionsV2Ref],
  );

  return {getNewGame, loading, error};
};
