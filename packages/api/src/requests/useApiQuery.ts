import useSWR from "swr";
import {apiGet} from "../apiClient";

export function useApiQuery<T>(path: string) {
  const {data, mutate} = useSWR<T, Error>(
    path,
    (p: string) => apiGet<T>(p),
    {suspense: true},
  );

  return {data: data as T, refetch: mutate};
}
