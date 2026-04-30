import {SpotifyTimeRange, SpotifyTopTracksPage} from "@bored/utils";
import useSWR from "swr";
import {apiGetWithAuth} from "../apiClient";

export interface UseGetSpotifyTopTracksArgs {
  timeRange: SpotifyTimeRange;
  limit?: number;
  offset?: number;
  enabled?: boolean;
  getAccessToken: () => Promise<string>;
}

export const useGetSpotifyTopTracks = ({
  timeRange,
  limit = 20,
  offset = 0,
  enabled = true,
  getAccessToken,
}: UseGetSpotifyTopTracksArgs) => {
  const path = `/api/spotify/me/top/tracks?time_range=${timeRange}&limit=${limit}&offset=${offset}`;
  const {data, mutate, error, isLoading} = useSWR<SpotifyTopTracksPage, Error>(
    enabled ? ["spotify-top-tracks", path] : null,
    async () => {
      const token = await getAccessToken();
      return apiGetWithAuth<SpotifyTopTracksPage>(path, token);
    },
    {suspense: true},
  );

  return {data: data as SpotifyTopTracksPage, refetch: mutate, error, isLoading};
};
