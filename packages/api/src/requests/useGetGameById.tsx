import {child, get} from "firebase/database";
import {useCallback, useEffect, useState} from "react";
import {useFirebaseContext} from "@camkerber/react-firebase-db";
import {GameV2} from "@bored/utils";

export const useGetGameById = (gameId: string) => {
  const {dbRef} = useFirebaseContext();
  const [data, setData] = useState<GameV2 | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getGameById = useCallback(
    async (refetchId?: string) => {
      if (!gameId && !refetchId) return;

      setLoading(true);
      try {
        const snapshot = await get(
          child(dbRef, `/camnections-v2/games/${refetchId ?? gameId}`),
        );
        if (snapshot.exists()) {
          setError(null);
          setData(snapshot.val() as GameV2);
        } else {
          throw new Error(
            `Game with ID ${refetchId ?? gameId} could not be found`,
          );
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [dbRef, gameId],
  );

  useEffect(() => {
    void getGameById();
  }, [dbRef, getGameById, gameId]);

  return {data, loading, error, refetch: getGameById};
};
