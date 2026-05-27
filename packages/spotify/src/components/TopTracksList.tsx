import {SpotifyTimeRange} from "@bored/utils";
import {useGetSpotifyTopTracks} from "@bored/api";
import {useSpotifyAuth} from "../context";
import {MediaRankCard} from "./MediaRankCard";
import {TopItemsGrid} from "./TopItemsGrid";

interface TopTracksListProps {
  timeRange: SpotifyTimeRange;
  limit?: number;
}

export const TopTracksList = ({timeRange, limit = 20}: TopTracksListProps) => {
  const {getValidAccessToken} = useSpotifyAuth();
  const {data} = useGetSpotifyTopTracks({
    timeRange,
    limit,
    getAccessToken: getValidAccessToken,
  });

  return (
    <TopItemsGrid
      items={data?.items ?? []}
      emptyMessage="No top songs found for this time range yet."
      renderItem={(track, index) => (
        <MediaRankCard
          key={track.id}
          rank={index + 1}
          name={track.name}
          imageUrl={track.album.images?.[0]?.url}
          subtitle={track.artists.map((a) => a.name).join(", ") || undefined}
          externalUrl={track.external_urls.spotify}
          elevation={2}
        />
      )}
    />
  );
};
