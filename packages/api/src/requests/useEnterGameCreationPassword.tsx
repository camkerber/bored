import {child, update} from "firebase/database";
import {useCallback, useState} from "react";
import {useFirebaseContext} from "@bored/providers";

export const useEnterGameCreationPassword = () => {
  const {camnectionsV2Ref} = useFirebaseContext();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const enterWithPassword = useCallback(
    async (passwordGuess: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await update(child(camnectionsV2Ref, "/gameCreationSecrets"), {
          password: passwordGuess,
        });
        return true;
      } catch (_) {
        setError(new Error("Incorrect password"));
        return false;
      } finally {
        setLoading(false);
      }
    },
    [camnectionsV2Ref],
  );

  return {enterWithPassword, loading, error};
};
