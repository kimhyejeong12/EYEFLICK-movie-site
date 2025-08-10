import { fetcher } from './apiClient.js';

/**
 * 카테고리별 TV 프로그램 목록을 가져옵니다.
 */
export function getTvByCategory(category, page = 1) {
  const validCategory = ['popular', 'top_rated'].includes(category) ? category : 'popular';
  return fetcher(`/tv/${validCategory}`, { page });
}

/**
 * TV 프로그램을 검색합니다.
 */
export function searchTv(query) {
  return fetcher("/search/tv", { query });
}

/**
 * TV 프로그램의 상세 정보를 가져옵니다.
 * 관련 비디오, 출연진, 비슷한 콘텐츠, 추천 콘텐츠, 리뷰를 함께 가져옵니다.
 */
export function getTvDetail(tvId) {
  const params = {
    append_to_response: "videos,credits,similar,recommendations,reviews",
  };
  return fetcher(`/tv/${tvId}`, params);
}
