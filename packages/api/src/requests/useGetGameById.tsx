import {child, get} from "firebase/database";
import {useCallback, useEffect, useState} from "react";
import {useFirebaseContext} from "@bored/providers";
import {GameV2} from "@bored/utils";

export const useGetGameById = (gameId: string) => {
  const {camnectionsV2Ref} = useFirebaseContext();
  const [data, setData] = useState<GameV2 | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getGameById = useCallback(
    async (refetchId?: string) => {
      if (!gameId && !refetchId) return;

      setLoading(true);
      try {
        const snapshot = await get(
          child(camnectionsV2Ref, `/games/${refetchId ?? gameId}`),
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
    [camnectionsV2Ref, gameId],
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getGameById();
  }, [camnectionsV2Ref, getGameById, gameId]);

  return {data, loading, error, refetch: getGameById};
};
