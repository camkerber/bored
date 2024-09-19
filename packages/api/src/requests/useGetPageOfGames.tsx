import {
  child,
  get,
  limitToFirst,
  orderByKey,
  Query,
  query,
  startAt,
} from "firebase/database";
import {useCallback, useState} from "react";
import {useFirebaseContext} from "@bored/providers";
import {GameV2} from "@bored/utils";

export const useGetPageOfGames = (pageLength: number) => {
  const {camnectionsV2Ref} = useFirebaseContext();
  const [data, setData] = useState<GameV2[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [startKey, setStartKey] = useState<string | undefined>(undefined);
  const [pageEnd, setPageEnd] = useState<number>(pageLength);

  const getNextPage = useCallback(async () => {
    setLoading(true);
    try {
      let dataQuery: Query;
      if (!startKey) {
        dataQuery = query(
          child(camnectionsV2Ref, `/games`),
          orderByKey(),
          limitToFirst(pageLength),
        );
      } else {
        dataQuery = query(
          child(camnectionsV2Ref, `/games`),
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
      console.log("results", snapshot.val());
    } catch (error) {
      setError(error as Error);
    } finally {
      setPageEnd(pageEnd + pageLength);
      setLoading(false);
    }
  }, [camnectionsV2Ref, pageEnd, pageLength, startKey]);

  return {data, loading, error, getNextPage};
};
