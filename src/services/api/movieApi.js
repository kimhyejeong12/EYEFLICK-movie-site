const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMoviesByCategory(category, page = 1) {
  const endpoints = {
    popular: () => fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`).then(response => response.json()),
    upcoming: () => fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=${page}`).then(response => response.json()),
    top_rated: () => fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=${page}`).then(response => response.json()),
    now_playing: () => fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${page}`).then(response => response.json())
  };
  
  return endpoints[category] ? endpoints[category]() : endpoints.now_playing();
}

export function searchMovies(query) {
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}`).then(
    (response) => response.json()
  );
}
