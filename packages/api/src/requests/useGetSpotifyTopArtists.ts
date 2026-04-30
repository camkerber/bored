import {SpotifyTimeRange, SpotifyTopArtistsPage} from "@bored/utils";
import useSWR from "swr";
import {apiGetWithAuth} from "../apiClient";

export interface UseGetSpotifyTopArtistsArgs {
  timeRange: SpotifyTimeRange;
  limit?: number;
  offset?: number;
  enabled?: boolean;
  getAccessToken: () => Promise<string>;
}

export const useGetSpotifyTopArtists = ({
  timeRange,
  limit = 20,
  offset = 0,
  enabled = true,
  getAccessToken,
}: UseGetSpotifyTopArtistsArgs) => {
  const path = `/api/spotify/me/top/artists?time_range=${timeRange}&limit=${limit}&offset=${offset}`;
  const {data, mutate, error, isLoading} = useSWR<SpotifyTopArtistsPage, Error>(
    enabled ? ["spotify-top-artists", path] : null,
    async () => {
      const token = await getAccessToken();
      return apiGetWithAuth<SpotifyTopArtistsPage>(path, token);
    },
    {suspense: true},
  );

  return {data: data as SpotifyTopArtistsPage, refetch: mutate, error, isLoading};
};
