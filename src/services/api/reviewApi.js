const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovieReviews(movieId, language = "ko-KR", page = 1) {
  return fetch(`${BASE_PATH}/movie/${movieId}/reviews?api_key=${API_KEY}&language=${language}&page=${page}`).then(
    (response) => response.json()
  );
}

export function getTvReviews(tvId, language = "ko-KR", page = 1) {
  return fetch(`${BASE_PATH}/tv/${tvId}/reviews?api_key=${API_KEY}&language=${language}&page=${page}`).then(
    (response) => response.json()
  );
}

