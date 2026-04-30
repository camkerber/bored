export type SpotifyTimeRange = "short_term" | "medium_term" | "long_term";

export interface SpotifyImage {
  url: string;
  width: number;
  height: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  external_urls: { spotify: string };
  genres?: string[];
  images?: SpotifyImage[];
  popularity?: number;
}

export interface SpotifyTopArtistsPage {
  items: SpotifyArtist[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

export interface SpotifyTrackArtist {
  id: string;
  name: string;
  external_urls: { spotify: string };
}

export interface SpotifyAlbumRef {
  id: string;
  name: string;
  images?: SpotifyImage[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  external_urls: { spotify: string };
  artists: SpotifyTrackArtist[];
  album: SpotifyAlbumRef;
  preview_url?: string | null;
  popularity?: number;
}

export interface SpotifyTopTracksPage {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

export type SpotifyTopItemKind = "artists" | "tracks";
