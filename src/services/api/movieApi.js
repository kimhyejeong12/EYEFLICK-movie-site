import { fetcher } from './apiClient.js';

/**
 * 카테고리별 영화 목록을 가져옵니다.
 */
export function getMoviesByCategory(category, page = 1) {
  const validCategory = ['popular', 'top_rated', 'now_playing'].includes(category) ? category : 'now_playing';
  return fetcher(`/movie/${validCategory}`, { page });
}

/**
 * 영화를 검색합니다.
 */
export function searchMovies(query) {
  return fetcher("/search/movie", { query });
}

/**
 * 영화의 상세 정보를 가져옵니다.
 * 관련 비디오, 출연진, 비슷한 콘텐츠, 추천 콘텐츠, 리뷰를 함께 가져옵니다.
 */
export function getMovieDetail(movieId) {
  const params = {
    append_to_response: "videos,credits,similar,recommendations,reviews",
  };
  return fetcher(`/movie/${movieId}`, params);
}
