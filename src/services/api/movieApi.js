import { fetcher } from './apiClient.js';

/**
 * 카테고리별 영화 목록
 */
export function getMoviesByCategory(category, page = 1) {
  const validCategory = ['popular', 'top_rated', 'now_playing'].includes(category) ? category : 'now_playing';
  return fetcher(`/movie/${validCategory}`, { page });
}

/**
 * 영화 검색
 */
export function searchMovies(query) {
  return fetcher("/search/movie", { query });
}

/**
 * 영화의 상세 정보
 */
export function getMovieDetail(movieId) {
  const params = {
    append_to_response: "videos,credits,similar,recommendations,reviews",
  };
  return fetcher(`/movie/${movieId}`, params);
}
