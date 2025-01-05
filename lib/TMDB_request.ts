// TMDB Api key which is stored in .env file.
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL; // abse url for all the fetch request.

// if there is error in api key throw error.
if (!API_KEY || !BASE_URL) {
    throw new Error("Invalid TMDB keys.");
}

// creating interface for request url.
interface IRequest {
    Trending: string;
    PopularMovies: string;
    TopRated: string;
    UpcomingMovies: string;
    NowPlayingMovies: string;
    PopularTVShows: string;
    TopRatedTVShows: string;
    NetflixOriginals: string;
    SearchMovies: (query: string) => string;
    MovieDetails: (movieId: number) => string;
    SimilarMovies: (movieId: number) => string;
}

// creating request object with different requesting options.
// will make it easy to fetch data from axios.
const request: IRequest = {
    Trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&&language=en-US`, // fetch url for  trending movies.
    PopularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`, // fetch url for popular movies.
    TopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`, // fetch url for top rated movies.
    NetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`, // fetch banner poster movies netflix.
    UpcomingMovies: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`, // fecth url for upcoming movies.
    NowPlayingMovies: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`, // fetch url for now playing.
    PopularTVShows: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`, // fetch url for popular tv shows.
    TopRatedTVShows: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`, // fetch url for top rated tv shows.
    SearchMovies: (query: string) =>
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            query
        )}&page=1`, // search movies by name function which return url.
    MovieDetails: (movieId: number) =>
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`, // get movie details with movied id.
    SimilarMovies: (movieId: number) =>
        `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`, // find similar movies.
};

export default request;
