import {child, get} from "firebase/database";
import {useCallback, useEffect, useState} from "react";
import {useFirebaseContext} from "@camkerber/react-firebase-db";
import {WordleDictionary} from "@bored/utils";

export const useGetWordleDictionary = () => {
  const {dbRef} = useFirebaseContext();
  const [data, setData] = useState<WordleDictionary | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getDictionary = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await get(child(dbRef, "/wordle"));
      if (snapshot.exists()) {
        setError(null);
        setData(snapshot.val() as WordleDictionary);
      } else {
        throw new Error("Failed to get Wordle Dictionary from Firebase");
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dbRef]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDictionary();
  }, [dbRef, getDictionary]);

  return {data, loading, error};
};
