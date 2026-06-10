import type {SpotifyTimeRange, SpotifyTopTracksPage} from "@bored/utils";
import useSWR, {preload} from "swr";
import {apiGetWithAuth} from "../apiClient";

export interface UseGetSpotifyTopTracksArgs {
  timeRange: SpotifyTimeRange;
  limit?: number;
  offset?: number;
  enabled?: boolean;
  getAccessToken: () => Promise<string>;
}

const buildPath = (
  timeRange: SpotifyTimeRange,
  limit: number,
  offset: number,
) =>
  `/api/spotify/me/top/tracks?time_range=${timeRange}&limit=${limit}&offset=${offset}`;

const buildKey = (path: string) => ["spotify-top-tracks", path] as const;

const createFetcher =
  (path: string, getAccessToken: () => Promise<string>) =>
  async (): Promise<SpotifyTopTracksPage> => {
    const token = await getAccessToken();
    return apiGetWithAuth<SpotifyTopTracksPage>(path, token);
  };

export interface PreloadSpotifyTopTracksArgs {
  timeRange: SpotifyTimeRange;
  limit?: number;
  offset?: number;
  getAccessToken: () => Promise<string>;
}

/**
 * Warm the SWR cache for the top-tracks chart so it can resolve in parallel
 * with the auth refresh instead of waiting for it (avoids a render waterfall).
 */
export const preloadSpotifyTopTracks = ({
  timeRange,
  limit = 20,
  offset = 0,
  getAccessToken,
}: PreloadSpotifyTopTracksArgs): Promise<SpotifyTopTracksPage> => {
  const path = buildPath(timeRange, limit, offset);
  return preload(buildKey(path), createFetcher(path, getAccessToken));
};

export const useGetSpotifyTopTracks = ({
  timeRange,
  limit = 20,
  offset = 0,
  enabled = true,
  getAccessToken,
}: UseGetSpotifyTopTracksArgs) => {
  const path = buildPath(timeRange, limit, offset);
  const {data, mutate, error, isLoading} = useSWR<SpotifyTopTracksPage, Error>(
    enabled ? buildKey(path) : null,
    createFetcher(path, getAccessToken),
    {suspense: true},
  );

  return {
    data: data as SpotifyTopTracksPage,
    refetch: mutate,
    error,
    isLoading,
  };
};
