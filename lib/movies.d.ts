export interface TMDBResponse {
    page: number;
    results: Array<{
        // Movie or TV Show
        id: number;
        backdrop_path: string | null;
        poster_path: string | null;
        popularity: number;
        overview: string;
        vote_average: number;
        vote_count: number;
        genre_ids?: number[]; // Included in trending responses
        // Movie-specific
        title?: string;
        original_title?: string;
        release_date?: string;
        video?: boolean;
        adult?: boolean;
        original_language?: string;
        // TV Show-specific
        name?: string;
        original_name?: string;
        first_air_date?: string;
        origin_country?: string[];
    }>;
    total_pages: number;
    total_results: number;

    // For detailed movie responses
    adult?: boolean;
    budget?: number;
    genres?: Array<{
        id: number;
        name: string;
    }>;
    homepage?: string | null;
    imdb_id?: string | null;
    production_companies?: Array<{
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }>;
    production_countries?: Array<{
        iso_3166_1: string;
        name: string;
    }>;
    revenue?: number;
    runtime?: number | null;
    spoken_languages?: Array<{
        iso_639_1: string;
        name: string;
    }>;
    status?: string;
    tagline?: string | null;
    budget?: number;
}

export interface TMDBResult {
    id: number;
    backdrop_path: string | null;
    poster_path: string | null;
    popularity: number;
    overview: string;
    vote_average: number;
    vote_count: number;
    genre_ids?: number[]; // For trending or popular endpoints
    // Movie-specific fields
    title?: string;
    original_title?: string;
    release_date?: string;
    video?: boolean;
    adult?: boolean;
    original_language?: string;
    // TV Show-specific fields
    name?: string;
    original_name?: string;
    first_air_date?: string;
    origin_country?: string[];
}
