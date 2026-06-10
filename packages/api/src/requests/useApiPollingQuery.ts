import useSWR from "swr";
import {apiGetWithHeaders} from "../apiClient";

export interface UseApiPollingQueryArgs<T> {
  path: string | null;
  headers?: Record<string, string>;
  intervalMs?: number | ((latest: T | undefined) => number);
  enabled?: boolean;
}

export function useApiPollingQuery<T>({
  path,
  headers,
  intervalMs = 5000,
  enabled = true,
}: UseApiPollingQueryArgs<T>) {
  const key = enabled && path ? ["polling", path, headers ?? {}] : null;
  const {data, mutate, error, isLoading} = useSWR<T, Error>(
    key,
    () => apiGetWithHeaders<T>(path as string, headers ?? {}),
    {
      refreshInterval: intervalMs,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  return {data, refetch: mutate, error, isLoading};
}
