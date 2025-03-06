import {child, get} from "firebase/database";
import {useCallback, useEffect, useState} from "react";
import {useFirebaseContext} from "@camkerber/react-firebase-db";
import {GameV2} from "@bored/utils";

export const useGetAllGames = () => {
  const {dbRef} = useFirebaseContext();
  const [data, setData] = useState<GameV2[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllGames = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await get(child(dbRef, `/camnections-v2/games`));
      const newData = Object.values(snapshot.val() as object) as GameV2[];
      if (snapshot.exists() && newData) {
        setError(null);
        setData(newData);
      } else {
        throw new Error("Games could not be found...");
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dbRef]);

  useEffect(() => {
    void getAllGames();
  }, [getAllGames]);

  return {data, loading, error, getAllGames};
};
