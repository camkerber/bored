import type {SpotifyTimeRange, SpotifyTopArtistsPage} from "@bored/utils";
import useSWR, {preload} from "swr";
import {apiGetWithAuth} from "../apiClient";

export interface UseGetSpotifyTopArtistsArgs {
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
  `/api/spotify/me/top/artists?time_range=${timeRange}&limit=${limit}&offset=${offset}`;

const buildKey = (path: string) => ["spotify-top-artists", path] as const;

const createFetcher =
  (path: string, getAccessToken: () => Promise<string>) =>
  async (): Promise<SpotifyTopArtistsPage> => {
    const token = await getAccessToken();
    return apiGetWithAuth<SpotifyTopArtistsPage>(path, token);
  };

export interface PreloadSpotifyTopArtistsArgs {
  timeRange: SpotifyTimeRange;
  limit?: number;
  offset?: number;
  getAccessToken: () => Promise<string>;
}

/**
 * Warm the SWR cache for the top-artists chart so it can resolve in parallel
 * with the auth refresh instead of waiting for it (avoids a render waterfall).
 */
export const preloadSpotifyTopArtists = ({
  timeRange,
  limit = 20,
  offset = 0,
  getAccessToken,
}: PreloadSpotifyTopArtistsArgs): Promise<SpotifyTopArtistsPage> => {
  const path = buildPath(timeRange, limit, offset);
  return preload(buildKey(path), createFetcher(path, getAccessToken));
};

export const useGetSpotifyTopArtists = ({
  timeRange,
  limit = 20,
  offset = 0,
  enabled = true,
  getAccessToken,
}: UseGetSpotifyTopArtistsArgs) => {
  const path = buildPath(timeRange, limit, offset);
  const {data, mutate, error, isLoading} = useSWR<SpotifyTopArtistsPage, Error>(
    enabled ? buildKey(path) : null,
    createFetcher(path, getAccessToken),
    {suspense: true},
  );

  return {
    data: data as SpotifyTopArtistsPage,
    refetch: mutate,
    error,
    isLoading,
  };
};
