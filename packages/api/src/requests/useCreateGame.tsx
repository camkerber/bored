import {child, get, set} from "firebase/database";
import {useCallback, useState} from "react";
import {useFirebaseContext} from "@camkerber/react-firebase-db";
import {generateId, GameV2} from "@bored/utils";

interface CreateGameReturn {
  id: string;
  title: string;
}

export const useCreateGame = () => {
  const {dbRef} = useFirebaseContext();
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
          child(dbRef, `/camnections-v2/games/${newGameId}`),
          createThisGame,
        );
        const snapshot = await get(child(dbRef, "/camnections-v2/gameIds"));
        if (snapshot.exists()) {
          const index = (snapshot.val() as string[]).length;
          await set(
            child(dbRef, `/camnections-v2/gameIds/${index}`),
            newGameId,
          );
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
    [dbRef],
  );

  return {createGame, loading, error};
};
