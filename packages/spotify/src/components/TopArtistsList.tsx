import {SpotifyTimeRange} from "@bored/utils";
import {useGetSpotifyTopArtists} from "@bored/api";
import {useSpotifyAuth} from "../context";
import {MediaRankCard} from "./MediaRankCard";
import {TopItemsGrid} from "./TopItemsGrid";

interface TopArtistsListProps {
  timeRange: SpotifyTimeRange;
  limit?: number;
}

export const TopArtistsList = ({
  timeRange,
  limit = 20,
}: TopArtistsListProps) => {
  const {getValidAccessToken} = useSpotifyAuth();
  const {data} = useGetSpotifyTopArtists({
    timeRange,
    limit,
    getAccessToken: getValidAccessToken,
  });

  return (
    <TopItemsGrid
      items={data?.items ?? []}
      emptyMessage="No top artists found for this time range yet."
      renderItem={(artist, index) => (
        <MediaRankCard
          key={artist.id}
          rank={index + 1}
          name={artist.name}
          imageUrl={artist.images?.[0]?.url}
          subtitle={artist.genres?.[0]}
          externalUrl={artist.external_urls.spotify}
        />
      )}
    />
  );
};
