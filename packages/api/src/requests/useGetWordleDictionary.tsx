import {get} from "firebase/database";
import {useCallback, useEffect, useState} from "react";
import {useFirebaseContext} from "@bored/providers";
import {WordleDictionary} from "@bored/utils";

export const useGetWordleDictionary = () => {
  const {wordleRef} = useFirebaseContext();
  const [data, setData] = useState<WordleDictionary | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getDictionary = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await get(wordleRef);
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
  }, [wordleRef]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDictionary();
  }, [wordleRef, getDictionary]);

  return {data, loading, error};
};
