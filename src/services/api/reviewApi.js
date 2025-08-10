import { fetcher } from './apiClient.js';

/**
 * 영화리뷰
 */
export function getMovieReviews(movieId, page = 1) {
  return fetcher(`/movie/${movieId}/reviews`, { page });
}

/**
 * TV프로그램 리뷰
 */
export function getTvReviews(tvId, page = 1) {
  return fetcher(`/tv/${tvId}/reviews`, { page });
}

