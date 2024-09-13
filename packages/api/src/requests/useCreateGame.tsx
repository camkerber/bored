import {child, get, set} from "firebase/database";
import {useCallback, useState} from "react";
import {useFirebaseContext} from "@bored/providers";
import {generateId, GameV2} from "@bored/utils";

interface CreateGameReturn {
  id: string;
  title: string;
}

export const useCreateGame = () => {
  const {camnectionsV2Ref} = useFirebaseContext();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createGame = useCallback(
    async (game: GameV2): Promise<CreateGameReturn | undefined> => {
      setLoading(true);
      setError(null);
      const newGameId = game.id ?? generateId();
      const createThisGame = {
        ...game,
        id: newGameId,
      };
      try {
        await set(
          child(camnectionsV2Ref, `/games/${newGameId}`),
          createThisGame,
        );
        const snapshot = await get(child(camnectionsV2Ref, "/gameIds"));
        if (snapshot.exists()) {
          const index = (snapshot.val() as string[]).length;
          await set(child(camnectionsV2Ref, `/gameIds/${index}`), newGameId);
        } else {
          throw new Error("Could not create a new game. Please try again.");
        }
        return {
          id: newGameId,
          title: game.title,
        };
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [camnectionsV2Ref],
  );

  return {createGame, loading, error};
};
