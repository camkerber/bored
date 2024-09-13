import {getToken} from "firebase/app-check";
import {getAuth, signInAnonymously} from "firebase/auth";
import {DatabaseReference, getDatabase, ref} from "firebase/database";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import firebaseAppCheck from "./config";

export interface Firebase {
  camnectionsV2Ref: DatabaseReference;
  initializing: boolean;
}

const DEFAULT_FIREBASE_CONTEXT: Firebase = {
  camnectionsV2Ref: {} as DatabaseReference,
  initializing: true,
};

export const FirebaseContext = createContext(DEFAULT_FIREBASE_CONTEXT);

export const FirebaseProvider = ({children}: PropsWithChildren) => {
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    setInitializing(true);
    const initializeFirebase = async () => {
      const auth = getAuth();
      await signInAnonymously(auth);
      await getToken(firebaseAppCheck);
    };
    initializeFirebase()
      .then(() => {})
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setInitializing(false);
      });
  }, []);

  const camnectionsV2Ref = useMemo(() => {
    const database = getDatabase(firebaseAppCheck.app);
    return ref(database, "camnections-v2");
  }, []);

  const dbRefs = useMemo(
    () => ({
      camnectionsV2Ref,
      initializing,
    }),
    [camnectionsV2Ref, initializing],
  );

  return (
    <FirebaseContext.Provider value={dbRefs}>
      {children}
    </FirebaseContext.Provider>
  );
};
