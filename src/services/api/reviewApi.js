import { fetcher } from './apiClient.js';

/**
 * 영화의 리뷰를 가져옵니다.
 */
export function getMovieReviews(movieId, page = 1) {
  return fetcher(`/movie/${movieId}/reviews`, { page });
}

/**
 * TV 프로그램의 리뷰를 가져옵니다.
 */
export function getTvReviews(tvId, page = 1) {
  return fetcher(`/tv/${tvId}/reviews`, { page });
}

