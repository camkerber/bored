import {child, update} from "firebase/database";
import {useCallback, useState} from "react";
import {useFirebaseContext} from "@camkerber/react-firebase-db";

export const useEnterGameCreationPassword = () => {
  const {dbRef} = useFirebaseContext();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const enterWithPassword = useCallback(
    async (passwordGuess: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await update(child(dbRef, "/camnections-v2/gameCreationSecrets"), {
          password: passwordGuess,
        });
        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        setError(new Error("Incorrect password"));
        return false;
      } finally {
        setLoading(false);
      }
    },
    [dbRef],
  );

  return {enterWithPassword, loading, error};
};
