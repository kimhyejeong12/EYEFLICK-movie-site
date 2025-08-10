import { fetcher } from './apiClient.js';

/**
 * 영화리뷰
 */
export function getMovieReviews(movieId, language = "ko-KR", page = 1) {
  return fetcher(`/movie/${movieId}/reviews`, { language, page });
}

/**
 * TV프로그램 리뷰
 */
export function getTvReviews(tvId, language = "ko-KR", page = 1) {
  return fetcher(`/tv/${tvId}/reviews`, { language, page });
}

