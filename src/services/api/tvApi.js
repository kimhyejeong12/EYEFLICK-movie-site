import { fetcher } from './apiClient.js';

/**
 * 카테고리별 TV 프로그램 목록
 */
export function getTvByCategory(category, page = 1) {
  const validCategory = ['popular', 'top_rated'].includes(category) ? category : 'popular';
  return fetcher(`/tv/${validCategory}`, { page });
}

/**
 * TV 프로그램 검색
 */
export function searchTv(query) {
  return fetcher("/search/tv", { query });
}

/**
 * TV 프로그램 상세 정보
 */
export function getTvDetail(tvId) {
  const params = {
    append_to_response: "videos,credits,similar,recommendations,reviews",
  };
  return fetcher(`/tv/${tvId}`, params);
}
