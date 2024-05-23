export interface IPopularMovies {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

type TResults = IPopularMovies[] | [];

export interface IMoviesResponse {
  page: number;
  results: TResults;
  total_pages: number;
  total_results: number;
}

export interface IMovieDetail {
  adult?: boolean;
  backdrop_path?: string;
  budget?: number;
  homepage?: string;
  id?: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: [] | never[] | undefined;
  production_countries?:
    | []
    | never[]
    | undefined
    | { iso_3166_1: string; name: string }[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_language?: [];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface ITrackedMovies {
  id: number;
  title: string;
  poster: string;
  watched: boolean;
  watchedDate: Date;
}

export interface IFavoritedMovies {
  id: number;
  title: string;
  poster: string;
  favorited: boolean;
  favoritedDate: Date;
}

export interface IVideosResponse {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
type TGeneralProviders = {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
};

export type TWatchProvidersResult = {
  link: string;
  flatrate: TGeneralProviders[];
  rent: TGeneralProviders[];
  buy: TGeneralProviders[];
};

export interface IWatchProviders {
  id: number;
  results: TWatchProvidersResult;
}
