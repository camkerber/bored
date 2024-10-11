import {
  child,
  get,
  limitToFirst,
  orderByKey,
  Query,
  query,
  startAt,
} from "firebase/database";
import {useCallback, useEffect, useState} from "react";
import {useFirebaseContext} from "@camkerber/react-firebase-db";
import {GameV2} from "@bored/utils";

export const useGetPageOfGames = (pageLength: number) => {
  const {dbRef} = useFirebaseContext();

  const [data, setData] = useState<GameV2[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [startKey, setStartKey] = useState<string | undefined>(undefined);
  const [pageEnd, setPageEnd] = useState<number>(pageLength);

  const [canPageForward, setCanPageForward] = useState<boolean>(false);
  // const [canPageBackward, setCanPageBackward] = useState<boolean>(false);
  const [allGamesLength, setAllGamesLength] = useState<number>(0);

  useEffect(() => {
    (async function setup() {
      const idsSnapshot = await get(child(dbRef, "/camnections-v2/gameIds"));
      if (idsSnapshot.exists()) {
        const allGameIds = idsSnapshot.val() as string[];
        setAllGamesLength(allGameIds.length);
        if (allGameIds.length < pageLength) {
          setCanPageForward(false);
        } else {
          setCanPageForward(true);
        }
      }
    })()
      .then(() => {})
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allGamesLength < pageEnd) {
      setCanPageForward(false);
    } else {
      setCanPageForward(true);
    }
  }, [pageEnd, allGamesLength]);

  const getNextPage = useCallback(async () => {
    setLoading(true);
    try {
      let dataQuery: Query;
      if (!startKey) {
        dataQuery = query(
          child(dbRef, `/camnections-v2/games`),
          orderByKey(),
          limitToFirst(pageLength),
        );
      } else {
        dataQuery = query(
          child(dbRef, `/camnections-v2/games`),
          orderByKey(),
          startAt(startKey),
          limitToFirst(pageLength),
        );
      }

      const snapshot = await get(dataQuery);
      const newData = Object.values(snapshot.val() as object) as GameV2[];
      if (newData) {
        setData(newData);
        setStartKey(newData[0].id);
      } else {
        throw new Error("Games could not be found...");
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setPageEnd(pageEnd + pageLength);
      setLoading(false);
    }
  }, [dbRef, pageEnd, pageLength, startKey]);

  return {data, loading, error, getNextPage, canPageForward};
};
