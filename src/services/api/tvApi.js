const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export function getTvByCategory(category, page = 1) {
  const endpoints = {
    popular: () => fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`).then(response => response.json()),
    top_rated: () => fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=${page}`).then(response => response.json())
  };
  
  return endpoints[category] ? endpoints[category]() : endpoints.popular();
}

export function searchTv(query) {
  return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}`).then(
    (response) => response.json()
  );
}

export function getTvDetail(tvId) {
  return fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos,credits,similar,recommendations,reviews`).then(
    (response) => response.json()
  );
}

export function getTvTrailers(tvId) {
  return fetch(`${BASE_PATH}/tv/${tvId}/videos?api_key=${API_KEY}&language=ko-KR`).then(
    (response) => response.json()
  );
}

export function getTvCredits(tvId) {
  return fetch(`${BASE_PATH}/tv/${tvId}/credits?api_key=${API_KEY}&language=ko-KR`).then(
    (response) => response.json()
  );
}

export function getSimilarTv(tvId) {
  return fetch(`${BASE_PATH}/tv/${tvId}/similar?api_key=${API_KEY}&language=ko-KR`).then(
    (response) => response.json()
  );
}

export function getTvRecommendations(tvId) {
  return fetch(`${BASE_PATH}/tv/${tvId}/recommendations?api_key=${API_KEY}&language=ko-KR`).then(
    (response) => response.json()
  );
}

export function getTvReviews(tvId) {
  return fetch(`${BASE_PATH}/tv/${tvId}/reviews?api_key=${API_KEY}&language=ko-KR`).then(
    (response) => response.json()
  );
}
